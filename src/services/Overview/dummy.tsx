import { sleep } from '../../utils/common'
import {OverviewServiceInterface} from './interface'

export class OverviewServiceDummy implements OverviewServiceInterface {
    async getOverview() {
        await sleep(500)
        return {
          complianceScore: 50,
          pendingQuizCount: 20,
          affectingRiskCount: 20,
          solutionCount: 20,
          alertCount: 20,
          topAlerts: [
              {
                  id: 'ecebc955-80f4-4aca-915f-461e15e05abb',
                  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel turpis quis rutrum. In consectetur purus a arcu scelerisque tempus. Aliquam auctor nisi in tempor ullamcorper. Nullam vel hendrerit enim. Sed at tellus ipsum.',
                  state: 'pending',
                  priority: 'high',
                  title: 'title 1',
                  Regulation: {
                      id: '5034b33f-0ce1-4ab7-92a5-5d115b9cce6d',
                      description: 'Taxes',
                      name: 'Taxes'
                  }
              },
              {
                  id: 'ecebc955-80f4-4aca-915f-461e15e05abc',
                  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel turpis quis rutrum. In consectetur purus a arcu scelerisque tempus. Aliquam auctor nisi in tempor ullamcorper. Nullam vel hendrerit enim. Sed at tellus ipsum.',
                  state: 'pending',
                  priority: 'high',
                  title: 'title 2',
                  Regulation: {
                      id: '5034b33f-0ce1-4ab7-92a5-5d115b9cce6d',
                      description: 'Taxes',
                      name: 'Taxes'
                  }
              },
              {
                  id: 'ecebc955-80f4-4aca-915f-461e15e05aba',
                  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel turpis quis rutrum. In consectetur purus a arcu scelerisque tempus. Aliquam auctor nisi in tempor ullamcorper. Nullam vel hendrerit enim. Sed at tellus ipsum.',
                  state: 'pending',
                  priority: 'high',
                  title: 'title 3',
                  Regulation: {
                      id: '5034b33f-0ce1-4ab7-92a5-5d115b9cce6d',
                      description: 'Taxes',
                      name: 'Taxes'
                  }
              },
          ],
          topRisks: [
            {
              id: 'ecebc955-80f5-4aca-915f-461e15e05aba',
              name: 'riesgo',
              Regulation: {
                  id: '5034b33f-0ce1-4ab7-92a5-5d115b9cce6d',
                  name: 'AML',
                  description: 'AML'
              },
              score: 15
            }
          ],
        }
    }
}