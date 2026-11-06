import type { IInventorySyncRepository } from "../../application/interfaces/repositories/inventory.sync.interface.js";
import { postgresPool } from "../database/postgres/db.config.postgres.js";

export class PostgresSyncRepository implements IInventorySyncRepository {
  async upsert(item: any): Promise<void> {
    const query = `
      insert into items (id,name,description,stock,images,category,created_at,updated_at)
      values ($1,$2,$3,$4,$5,$6,$7,$8)
      on conflict (id) do update set
      name = EXCLUDED.name,
      description = EXCLUDED.description,
      stock = EXCLUDED.stock,
      images = EXCLUDED.images,
      category = EXCLUDED.category,
      created_at = EXCLUDED.created_at,
      updated_at = EXCLUDED.updated_at
      `;

      console.log(JSON.stringify(item.images))

    const values = [
      item._id.toString(),
      item.name,
      item.description,
      item.stock,
      JSON.stringify(item.images),
      item.category,
      item.createdAt ?? null,
      item.updatedAt ?? null,
    ];

    await postgresPool.query(query, values);
  }

  async deleteById(id: string): Promise<void> {
    const query = "DELETE FROM items WHERE id = $1";

    await postgresPool.query(query, [id]);

    console.log("synchronisation completed");
  }
}
