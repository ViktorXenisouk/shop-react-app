type ErrorResponse = {
    status: number;
    message: string;
    success: false
};

const apiRequest = async <T>(url: string,requestInit: RequestInit): Promise<{ data: T, success: true } | ErrorResponse> => {
    try {
        const response = await fetch(url, requestInit);

        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                status: response.status,
                message: errorData?.message || 'Something went wrong',
            };
        }

        const data = await response.json();
        return { data: data as T, success: true };
    } catch (error: any) {
        return {
            success: false,
            status: 500,
            message: error.message || 'Network error',
        };
    }
}

export { apiRequest }