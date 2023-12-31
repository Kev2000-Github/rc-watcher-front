/* eslint-disable @typescript-eslint/no-unused-vars */
import { ellipsisText, sleep } from '../../utils/common'
import { AML } from '../interface'
import {AMLFilter, AMLServiceInterface} from './interface'

export class AMLServiceDummy implements AMLServiceInterface {
    async getAML(_props: AMLFilter) {
      const sampleAML: AML = {
        id: '98765',
        fullName: 'Vladimir Putin',
        birthdate: new Date('1952-10-07'),
        country: 'Rusia',
        riskLevel: 'high',
        riskPoints: 78,
        picture: 'https://s.france24.com/media/display/647b0c3a-9698-11ea-adda-005056a964fe/w:1280/p:1x1/Poutine%20-.jpg',
        sanctions: [{
          content: 'Bloqueo de Activos'
        }, {
          content: 'Prohibición de Viaje'
        }, {
          content: 'Embargo de Armas'
        }],
        articles: [
          {
            content: 'Vladimir Putin: Un Vistazo a su Carrera Política',
            link: 'https://example.com/putin-article1',
          },
          {
            content: 'La Influencia de Vladimir Putin en las Relaciones Internacionales',
            link: 'https://example.com/putin-article2',
          },
        ],
      }
      sampleAML.articles = sampleAML.articles.map(val => ({
        ...val,
        content: ellipsisText(val.content, 100)
      }))
      await sleep(500)
      return sampleAML
    }
}