import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// const redis = Redis.fromEnv();

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(15, "10s"),
});

export const middleware = async (request) =>{
  // console.log('object :>> ', object);
  const ip = request.headers.get("x-forwarded-for") ?? "";
  const { success, reset } = await ratelimit.limit(ip);

  if (!success) {
    const now = Date.now();
    const retry = Math.floor((reset - now) / 1000);
    return new NextResponse("Please try again later", {
      status: 429,
      headers: {
        'Retry-After': retry.toString(),
      },
    });
  }

  return NextResponse.next();
}


export const config = {
    matcher: '/api/:path*',
  };

