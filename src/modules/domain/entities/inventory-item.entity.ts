export class InventoryItem {
  constructor(
    public readonly id: string,
    private name: string,
    private stock: number,
    private category: string,
    private description: string,
    private images: string[],
  ) {}
}
