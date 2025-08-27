import { createClient } from '@/utils/supabase/server';

export default async function Notes() {
    const supabase = createClient();
    const { data: notes } = await supabase.from("notes").select();
    const data1 = await supabase.rpc('check_note_exists', { note_id: 1 });
    const data2 = await supabase.rpc('note_email_exists', { p_email: 'anitacheung83@gmail.com' })
    const data3 = await supabase.rpc('email_exists', { email_to_check: 'anitacheung83@gmail.com' })

    return <pre>
        {/* {JSON.stringify(notes, null, 2)} */}
        {JSON.stringify(data1)}
        <br />

        {JSON.stringify(data2)}
        <br />
        {JSON.stringify(data3)}

    </pre>
}