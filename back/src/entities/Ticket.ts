export class Ticket {
  constructor(
    public id: number,
    public sessionId: number,
    public userId: number,
    public placeId: number,
    public status: string,
  ) {}
}
