'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Container } from './container';
import Image from 'next/image';
import Link from 'next/link';
import { SearchInput } from './search-input';
import { CartButton } from './cart-button';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { ProfileButton } from './profile-button';
import { AuthModal } from './modals';

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({
  hasSearch = true,
  hasCart = true,
  className,
}) => {
  const router = useRouter();
  const [openAuthModal, setOpenAuthModal] = React.useState(false);

  const searchParams = useSearchParams();

  React.useEffect(() => {
    let toastMessage = '';

    if (searchParams.has('paid')) {
      toastMessage =
        'Order successfully paid! Information has been sent to your email.';
    }

    if (searchParams.has('verified')) {
      toastMessage = 'Email successfully verified!';
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace('/');
        toast.success(toastMessage, {
          duration: 3000,
        });
      }, 1000);
    }
  }, []);

  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-4 lg:py-8">
        {/* Left part */}
        <div className="flex items-center flex-1 gap-3">
          <Link href="/" className="block">
            <div className="flex items-center gap-4">
              <Image className='min-w-[35px]' src="/logo.png" alt="Logo" width={35} height={35} />
              <div className="hidden lg:block">
                <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
                <p className="text-gray-400 leading-3">
                  it doesn&apos;t get any tastier
                </p>
              </div>
            </div>
          </Link>

          {hasSearch && (
            <div className="w-[100%] max-w-[240px] flex items-center">
              <SearchInput />
            </div>
          )}
        </div>

        {/* Right part */}
        <div className="flex items-center gap-3">
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />

          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
