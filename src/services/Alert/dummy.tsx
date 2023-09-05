import { sleep } from '../../utils/common'
import { Paginated, Alert, paginationProps } from '../interface'
import {AlertServiceInterface} from './interface'

export class AlertServiceDummy implements AlertServiceInterface {
    async getAlerts(paginationOpts: paginationProps) {
        const TOTAL_ALERTS = 100
        const {limit, page} = paginationOpts
        const result: Paginated<Alert> = {
            data: [
                {
                    id: 'ecebc955-80f4-4aca-915f-461e15e05abb',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit vel turpis quis rutrum. In consectetur purus a arcu scelerisque tempus. Aliquam auctor nisi in tempor ullamcorper. Nullam vel hendrerit enim. Sed at tellus ipsum.',
                    state: 'pending',
                    priority: 'high',
                    title: 'title',
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
                    title: 'title',
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
                    title: 'title',
                    Regulation: {
                        id: '5034b33f-0ce1-4ab7-92a5-5d115b9cce6d',
                        description: 'Taxes',
                        name: 'Taxes'
                    }
                },
            ],
            page,
            items: limit,
            totalPages: Math.floor(TOTAL_ALERTS/limit)
        }
        await sleep(500)
        return result
    }
    
}