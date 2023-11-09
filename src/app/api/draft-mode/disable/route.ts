import { redirect } from 'next/navigation';
import { draftMode } from 'next/headers';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const redirectUrl = searchParams.get('redirect')
  
  draftMode().disable()
  redirectUrl && redirect(redirectUrl)
  return new Response('Draft mode is disable')
}