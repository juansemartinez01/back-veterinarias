import { Subject } from "rxjs";

export type SttEvent =
  | { type: "partial"; text: string }
  | { type: "final"; text: string }
  | { type: "error"; text: string };

export class SttSession {
  chunks: Buffer[] = [];
  stream$ = new Subject<SttEvent>();
  closed = false;
  processing = false;
  lastEmit = 0;
}

export class SttSessionStore {
  private sessions = new Map<string, SttSession>();

  get(id: string) {
    return this.sessions.get(id);
  }

  ensure(id: string) {
    let s = this.sessions.get(id);
    if (!s) {
      s = new SttSession();
      this.sessions.set(id, s);
    }
    return s;
  }

  close(id: string) {
    const s = this.sessions.get(id);
    if (s && !s.closed) {
      s.closed = true;
      s.stream$.complete();
    }
    this.sessions.delete(id);
  }
}
