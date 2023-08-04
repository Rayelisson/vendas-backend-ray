/* eslint-disable prettier/prettier */

import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, NotFoundException, Inject } from '@nestjs/common';
import { AxiosError} from 'axios'
import { ReturnCepExternal } from './dto/return-cep-external.dto';
import { CityService } from 'src/city/city.service';
import { CityEntity } from 'src/city/entity/city.entity';
import { ReturnCep } from './dto/return-cep.dto';
import { Client } from 'nestjs-soap';
import { ResponsePriceCorreios } from './dto/response-price-correios';
import { CdFormatEnum } from './enums/cd-format.enum';
import { SizeProductDTO } from './dto/size-product';



@Injectable()
export class CarreiosService {
     URL_CORREIOS = process.env.URL_CEP_CORREIOS
     CEP_COMPANY = process.env.CEP_COMPANY
    constructor(
      @Inject('SOAP_CORREIOS') private readonly soapClient: Client,
      private readonly httpService: HttpService,
      private readonly cityService: CityService,
    ) {}

    async findAddressByCep(cep: string): Promise<ReturnCep> {
      const returnCep: ReturnCepExternal = await this.httpService.axiosRef
        .get<ReturnCepExternal>(this.URL_CORREIOS.replace('{CEP}', cep))
        .then((result) => {
          if (result.data.erro === 'true') {
            throw new NotFoundException('CEP not found');
          }
          return result.data;
        })
        .catch((error: AxiosError) => {
          throw new BadRequestException(
            `Error in connection request ${error.message}`,
          );
        });

        const city: CityEntity | undefined = await this.cityService
          .findCityByName(returnCep.localidade, returnCep.uf)
          .catch(() => undefined)

          return new ReturnCep(returnCep, city?.id, city?.state?.id)

      }

      async findPriceDelivery(
        cdService: string, 
        cep: string,
        sizeProduct: SizeProductDTO
        ): Promise<any> {
        return new Promise((resolve) => {
          this.soapClient.CalcPrecoPrazo(
            {
              nCdServico: cdService,
              sCepOrigem: this.CEP_COMPANY,
              sCepDestino: cep,
              nCdFormato: CdFormatEnum.BOX,
              nVlPeso: sizeProduct.weight,
              nVlComprimento: sizeProduct.length,
              nVlAltura: sizeProduct.height,
              nVlLargura: sizeProduct.width,
              nVlDiametro: sizeProduct.diameter,
              nCdEmpresa: '',
              sDsSenha: '',
              sCdMaoPropria: 'N',
              nVlValorDeclarado: sizeProduct.productValue < 25 ? 0 : sizeProduct.productValue,
              sCdAvisoRecebimento: 'N',
            },
            (_, res: ResponsePriceCorreios) => {
              if (res) {
                resolve(res);
              } else {
                throw new BadRequestException('Error SOAP');
              }
          })
        })
      }
}
