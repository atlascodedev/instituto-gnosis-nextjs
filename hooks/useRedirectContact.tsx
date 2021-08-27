import { useRouter } from 'next/router';

export const useRedirectContact = async (callback: () => Promise<unknown>) => {
  const router = useRouter();

  try {
    await callback();

    router.push('/contato-efetuado');
  } catch (error) {}
};

export default useRedirectContact;
