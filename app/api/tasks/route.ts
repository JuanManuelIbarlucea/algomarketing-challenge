// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { mongooseConnect } from '@/lib/mongoose';
import { Task } from '@/models/Task';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  await mongooseConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const product = await Task.findById(id);
    return NextResponse.json(product);
  } else {
    const allProducts = await Task.find();
    return NextResponse.json(allProducts);
  }
}

export async function POST(request: Request) {
  await mongooseConnect();

  const body = await request.json();
  console.log(body);
  const productDoc = await Task.create(body);
  return NextResponse.json(productDoc);
}
