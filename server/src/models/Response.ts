export class SuccessResponse {
    constructor(private data: any) {}
}

export class ErrorResponse {
    constructor(
        private message: string | undefined = undefined,
        private error: boolean = true,
    ) {}
}
