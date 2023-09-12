import Axios, { AxiosInstance} from 'axios';

// @TODO :: Extend api client to handle all crud operations
export interface IApiClient {
    get<TResponse>(path: string): Promise<TResponse>;
    post<TRequest, TResponse>(path: string, data: TRequest): Promise<TResponse>;
}

class ApiClient implements IApiClient {
    private client: AxiosInstance;

    protected createAxiosClient(): AxiosInstance {
        return Axios.create({
            baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8080/api' : 'https://be-spelling.onrender.com/api',
            responseType: 'json' as const,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    constructor() {
        this.client = this.createAxiosClient();
    }

    async get<TResponse>(path: string): Promise<TResponse> {
        try {
            const response = await this.client.get<TResponse>(path);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async post<TRequest, TResponse>(path: string, data: TRequest): Promise<TResponse> {
        try{
            const response = await this.client.post<TResponse>(path, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default new ApiClient();