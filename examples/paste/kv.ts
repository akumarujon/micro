import { Paste } from "./types.ts";

const kv = await Deno.openKv();

async function create(body: string): Promise<void> {
  const data = (await kv.get(["pastes"])).value as Paste[];
  console.log(!data);
  if (!data) {
    await kv.set(["pastes"], []);
  } else {
    data.push(
      {
        id: data.length,
        body,
      },
    );
    console.log(data);
    await kv.set(["pastes"], data);
  }
}

async function get(id: number): Promise<Paste> {
  const data = (await kv.get(["pastes"])).value as Paste[];
  if (data.length != 0) return data[id];
  else return {} as Paste;
}

async function getAll(): Promise<Paste[]> {
  const data = (await kv.get(["pastes"])).value;
  if (!data) {
    await kv.set(["pastes"], []);
    return [];
  } else {
    return data as Paste[];
  }
}

export { create, get, getAll };
