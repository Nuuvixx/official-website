import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // ?title=<title>
    const title = searchParams.has('title')
      ? searchParams.get('title')?.slice(0, 100)
      : 'Nuuvixx | Infrastructure for the machines that think';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#04040a',
            padding: '80px',
          }}
        >
          {/* Logo / Brand */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#CCFF00',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#04040a',
                fontSize: '24px',
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
                marginRight: '20px'
              }}
            >
              NX
            </div>
            <span style={{ color: '#CCFF00', fontSize: '32px', fontFamily: 'sans-serif', fontWeight: 600 }}>Nuuvixx</span>
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 64,
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
              color: 'white',
              lineHeight: 1.2,
              marginBottom: '20px',
              maxWidth: '800px',
            }}
          >
            {title}
          </div>
          
          <div
            style={{
              display: 'flex',
              fontSize: 32,
              fontFamily: 'sans-serif',
              color: '#8A8F98',
            }}
          >
            Open-source AI Infrastructure
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
