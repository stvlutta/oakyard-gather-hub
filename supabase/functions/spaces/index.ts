import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Space {
  id?: string
  title: string
  description: string
  location: string
  hourly_rate: number
  capacity: number
  category: string
  amenities: string[]
  images: string[]
  owner_id?: string
  owner_name?: string
  rating?: number
  reviews?: number
  availability?: any
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Get user from auth header if present
    const authHeader = req.headers.get('Authorization')
    let user = null
    if (authHeader) {
      const { data: { user: authUser } } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''))
      user = authUser
    }

    const url = new URL(req.url)
    const spaceId = url.searchParams.get('id')

    switch (req.method) {
      case 'GET':
        if (spaceId) {
          // Get single space
          const { data: space, error } = await supabase
            .from('spaces')
            .select('*')
            .eq('id', spaceId)
            .single()

          if (error) throw error

          return new Response(JSON.stringify(space), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        } else {
          // Get all spaces
          const { data: spaces, error } = await supabase
            .from('spaces')
            .select('*')
            .order('created_at', { ascending: false })

          if (error) throw error

          return new Response(JSON.stringify(spaces), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        }

      case 'POST':
        if (!user) {
          return new Response(JSON.stringify({ error: 'Authentication required' }), {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        }

        const spaceData: Space = await req.json()
        
        // Add owner information
        const newSpace = {
          ...spaceData,
          owner_id: user.id,
          owner_name: user.user_metadata?.full_name || user.email || 'Unknown User'
        }

        const { data: createdSpace, error: createError } = await supabase
          .from('spaces')
          .insert([newSpace])
          .select()
          .single()

        if (createError) throw createError

        console.log('Space created successfully:', createdSpace.id)

        return new Response(JSON.stringify(createdSpace), {
          status: 201,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })

      case 'PUT':
        if (!user || !spaceId) {
          return new Response(JSON.stringify({ error: 'Authentication and space ID required' }), {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        }

        const updateData = await req.json()
        
        const { data: updatedSpace, error: updateError } = await supabase
          .from('spaces')
          .update(updateData)
          .eq('id', spaceId)
          .eq('owner_id', user.id) // Ensure user owns the space
          .select()
          .single()

        if (updateError) throw updateError

        console.log('Space updated successfully:', spaceId)

        return new Response(JSON.stringify(updatedSpace), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })

      case 'DELETE':
        if (!user || !spaceId) {
          return new Response(JSON.stringify({ error: 'Authentication and space ID required' }), {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        }

        const { error: deleteError } = await supabase
          .from('spaces')
          .delete()
          .eq('id', spaceId)
          .eq('owner_id', user.id) // Ensure user owns the space

        if (deleteError) throw deleteError

        console.log('Space deleted successfully:', spaceId)

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })

      default:
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
    }
  } catch (error) {
    console.error('Error in spaces function:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})