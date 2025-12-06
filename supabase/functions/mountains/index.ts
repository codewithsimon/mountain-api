import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const url = new URL(req.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const mountainId = pathParts[pathParts.length - 1];

    if (mountainId && mountainId !== 'mountains') {
      const { data, error } = await supabase
        .from('mountains')
        .select('*')
        .eq('id', mountainId)
        .maybeSingle();

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      if (!data) {
        return new Response(
          JSON.stringify({ error: 'Mountain not found' }),
          {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(
        JSON.stringify(data),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    } else {
      const country = url.searchParams.get('country');
      const minHeight = url.searchParams.get('min_height');
      const maxHeight = url.searchParams.get('max_height');
      const range = url.searchParams.get('range');

      let query = supabase.from('mountains').select('*');

      if (minHeight) {
        query = query.gte('height', parseInt(minHeight));
      }

      if (maxHeight) {
        query = query.lte('height', parseInt(maxHeight));
      }

      if (range) {
        query = query.eq('range', range);
      }

      if (country) {
        query = query.filter('country', 'cs', `["${country}"]`);
      }

      const { data, error } = await query.order('height', { ascending: false });

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(
        JSON.stringify({
          results: data?.length || 0,
          mountains: data || [],
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});