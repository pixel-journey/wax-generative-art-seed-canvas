import { HISTORY_ORIGIN, historyTransaction } from "./api";
import { paramsFromSeed, sceneFromParams } from "./seed";
import type { ChainAction, HttpRequest } from "./api";

export type UseCase = {
  title: string;
  detail: string;
  request: HttpRequest;
  transaction: { note: string; actions: ChainAction[] } | null;
};

const id = "ab".repeat(32);
const params = paramsFromSeed(id);
const scene = sceneFromParams(params, 64);

export const USE_CASES: UseCase[] = [
  {
    title: "Load the transaction whose id is the seed",
    detail: "Hyperion get_transaction by id. The canvas only needs the hex. It does not parse traces, and this id is a fixture, not a mainnet transaction we looked up.",
    request: historyTransaction(HISTORY_ORIGIN, id),
    transaction: null,
  },
  {
    title: "A second id, same endpoint",
    detail: `Fixture seed hue ${params.hue}, rings ${params.rings}, shapes ${scene.length}. Painting is not an Antelope action.`,
    request: historyTransaction(HISTORY_ORIGIN, "cd".repeat(32)),
    transaction: null,
  },
];

export function assertUseCases(): void {
  if (params.seed !== id) throw new Error("seed");
  if (scene.length < 1) throw new Error("scene");
}
