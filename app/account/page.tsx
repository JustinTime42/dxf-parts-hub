'use client';
import CustomerPortalForm from '@/components/ui/AccountForms/CustomerPortalForm';

import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/utils/firebase';

export default function Account() {
  const router = useRouter();
  const [user, authLoading, authError] = useAuthState(auth);

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
            Hello {user?.email}! Here you will be able to manage your account settings, provide feedback and access your subscription details.
          </p>
          <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
            We are eager for any feedback you have on your experience. Please email us at <a href="mailto:justin@routeworks.app">justin@routeworks.app</a>.
          </p>
        </div>
      </div>
      <div className="p-4">
        {/* <CustomerPortalForm subscription={subscription} /> */}
      </div>
    </section>
  );
}
