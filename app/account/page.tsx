import CustomerPortalForm from '@/components/ui/AccountForms/CustomerPortalForm';

// import { createClient } from '@/utils/supabase/server';
// import { redirect } from 'next/navigation';

export default async function Account() {
  // const supabase = createClient();

  // const {
  //   data: { user }
  // } = await supabase.auth.getUser();

  // const { data: userDetails } = await supabase
  //   .from('users')
  //   .select('*')
  //   .single();

  // const { data: subscription, error } = await supabase
  //   .from('subscriptions')
  //   .select('*, prices(*, products(*))')
  //   .in('status', ['trialing', 'active'])
  //   .maybeSingle();

  // if (error) {
  //   console.log(error);
  // }

  // if (!user) {
  //   return redirect('/signin');
  // }

  return (
    <section className="mb-32 bg-black">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Account
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
            Coming Soon!
          </p>
        </div>
      </div>
      <div className="p-4">
        {/* <CustomerPortalForm subscription={subscription} /> */}
      </div>
    </section>
  );
}
