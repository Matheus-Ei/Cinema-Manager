export class Session {
  constructor(
    public id: number,
    public movieId: number,
    public roomId: number,
    public startDate: string,
    public price: number,
  ) {}
}
