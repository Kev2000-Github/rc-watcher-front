
export abstract class Client {
    abstract get: (url: string, sessionId: string) => unknown
    abstract delete: (url: string, sessionId: string) => unknown
    abstract post: (url: string, body: object, sessionId: string) => unknown
    abstract put: (url: string, body: object, sessionId: string) => unknown
}