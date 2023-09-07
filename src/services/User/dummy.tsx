import { sleep } from '../../utils/common'
import { User, paginationProps } from '../interface'
import { UserServiceInterface, createProps, deleteUserProps, mutateProps, mutateUserProps } from './interface'

export class UserServiceDummy implements UserServiceInterface {
    async getUsers(companyId: string, _: paginationProps) {
        const dummyUsers: User[] = [
            {
              id: 'f18aaf46-96ea-4dbb-9326-4a29be07c944',
              username: 'user1',
              fullName: 'John Doe',
              email: 'john.doe@example.com',
              Company: {
                id: 'efa9d27c-014c-46e9-91c9-8edf0a972b81',
                name: 'ABC Inc.',
                address: '123 Main St',
                Country: {
                  id: '5d5f8e10-14a6-4db7-8ef7-82561f3ea9bb',
                  name: 'United States',
                },
              },
              Role: {
                id: 'f47e4f33-abc1-4b36-8c25-d1f87b8f17ad',
                name: 'admin',
              },
              sessionId: '2e8a80d3-7042-472b-975c-5547be065086',
            },
            {
              id: 'c33a9917-d508-4d03-9375-50c26378eef8',
              username: 'user2',
              fullName: 'Jane Smith',
              email: 'jane.smith@example.com',
              Company: {
                id: 'daa11903-6aa1-46f2-aac1-80a8b19651c9',
                name: 'XYZ Corp.',
                address: '456 Elm St',
                Country: {
                  id: 'b88a3027-ff78-4a5d-9cd1-462b2f3b0d3e',
                  name: 'Canada',
                },
              },
              Role: {
                id: '1f2f45ed-1a1e-4eb5-94c6-6ca16f29d350',
                name: 'operador',
              },
              sessionId: 'b8d0e3c6-1df0-4e23-9a10-3dbf2b2bc309',
            },
            {
              id: '84e4b893-87dd-4342-a96f-9e75d4de8ab5',
              username: 'user3',
              fullName: 'Maria Rodriguez',
              email: 'maria.rodriguez@example.com',
              Company: {
                id: 'ba9080ca-4a7e-4727-a69c-0a2a78f5e105',
                name: 'PQR Ltd.',
                address: '789 Oak St',
                Country: {
                  id: '31aa5e53-b195-4db4-93b5-1e8a9b4a6034',
                  name: 'Spain',
                },
              },
              Role: {
                id: 'c9f0a8d4-4ec2-4fe5-a3a6-6f4a1a789d31',
                name: 'auditor',
              },
              sessionId: 'db57f57b-dc89-4ee4-99b3-36d8c4cafa0b',
            },
            {
              id: '786d5623-6c6f-4922-aa87-cc6a92ad0f33',
              username: 'user4',
              fullName: 'Michael Brown',
              email: 'michael.brown@example.com',
              Company: {
                id: '5872e12c-94cd-4e21-88cd-5a1f7ef1cbf8',
                name: 'LMN Ltd.',
                address: '101 Pine St',
                Country: {
                  id: '99a3e177-9ca1-4f3f-8b28-1b6f4e73d189',
                  name: 'United Kingdom',
                },
              },
              Role: {
                id: '34cd9d0f-1e2a-41a6-883d-8e6c502997e1',
                name: 'admin',
              },
              sessionId: 'f6b3c16d-c607-46b6-b1df-7c52a0a210a9',
            },
            {
              id: 'c2f7cefe-89d3-44de-aa7e-fc8ed8904f77',
              username: 'user5',
              fullName: 'Emily Johnson',
              email: 'emily.johnson@example.com',
              Company: {
                id: '57f5b091-07c9-41ae-8856-c4a8c932d6ca',
                name: 'NOP Inc.',
                address: '202 Cedar St',
                Country: {
                  id: 'd7e0e5a4-6df7-4c08-9ab6-936f5a5e6c4b',
                  name: 'Australia',
                },
              },
              Role: {
                id: 'c24a4dbf-2d9a-49b6-9d16-21f2a6c864c9',
                name: 'operador',
              },
              sessionId: '87d6f4a3-46e3-4ce3-9d91-65c9617a2260',
            },
          ];
        await sleep(500)
        return {
            data: dummyUsers,
            page: 1,
            items: 1,
            totalPages: 1
        }
    }

    async getUser(companyId: string, userId: string) {
        const dummyUser: User = {
            id: 'f18aaf46-96ea-4dbb-9326-4a29be07c944',
            username: 'user1',
            fullName: 'John Doe',
            email: 'john.doe@example.com',
            Company: {
              id: 'efa9d27c-014c-46e9-91c9-8edf0a972b81',
              name: 'ABC Inc.',
              address: '123 Main St',
              Country: {
                id: '5d5f8e10-14a6-4db7-8ef7-82561f3ea9bb',
                name: 'United States',
              },
            },
            Role: {
              id: 'f47e4f33-abc1-4b36-8c25-d1f87b8f17ad',
              name: 'admin',
            },
            sessionId: '2e8a80d3-7042-472b-975c-5547be065086',
          }
        await sleep(500)
        return dummyUser
    }

    async updateUser(_: mutateProps<mutateUserProps>) {
        const dummyUser: User = {
            id: 'f18aaf46-96ea-4dbb-9326-4a29be07c944',
            username: 'user1',
            fullName: 'John Doe',
            email: 'john.doe@example.com',
            Company: {
              id: 'efa9d27c-014c-46e9-91c9-8edf0a972b81',
              name: 'ABC Inc.',
              address: '123 Main St',
              Country: {
                id: '5d5f8e10-14a6-4db7-8ef7-82561f3ea9bb',
                name: 'United States',
              },
            },
            Role: {
              id: 'f47e4f33-abc1-4b36-8c25-d1f87b8f17ad',
              name: 'admin',
            },
            sessionId: '2e8a80d3-7042-472b-975c-5547be065086',
          }
        await sleep(500)
        return dummyUser
    }

    async deleteUser(_: deleteUserProps){
        const dummyUser: User = {
            id: 'f18aaf46-96ea-4dbb-9326-4a29be07c944',
            username: 'user1',
            fullName: 'John Doe',
            email: 'john.doe@example.com',
            Company: {
              id: 'efa9d27c-014c-46e9-91c9-8edf0a972b81',
              name: 'ABC Inc.',
              address: '123 Main St',
              Country: {
                id: '5d5f8e10-14a6-4db7-8ef7-82561f3ea9bb',
                name: 'United States',
              },
            },
            Role: {
              id: 'f47e4f33-abc1-4b36-8c25-d1f87b8f17ad',
              name: 'admin',
            },
            sessionId: '2e8a80d3-7042-472b-975c-5547be065086',
          }
        await sleep(500)
        return dummyUser
    }

    async createUser(_: createProps<mutateUserProps>){
        const dummyUser: User = {
            id: 'f18aaf46-96ea-4dbb-9326-4a29be07c944',
            username: 'user1',
            fullName: 'John Doe',
            email: 'john.doe@example.com',
            Company: {
              id: 'efa9d27c-014c-46e9-91c9-8edf0a972b81',
              name: 'ABC Inc.',
              address: '123 Main St',
              Country: {
                id: '5d5f8e10-14a6-4db7-8ef7-82561f3ea9bb',
                name: 'United States',
              },
            },
            Role: {
              id: 'f47e4f33-abc1-4b36-8c25-d1f87b8f17ad',
              name: 'admin',
            },
            sessionId: '2e8a80d3-7042-472b-975c-5547be065086',
          }
        await sleep(500)
        return dummyUser
    }
}