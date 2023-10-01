import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

import MenuItem from "../MenuItem";
import SignInSignUp from "../SignInSignUp";

type Props = {
  children?: ReactNode;
};

/** Documentation for Base component */
export function Base({ children }: Props) {
  return (
    <div className="flex min-h-full">
      <div className="bg-white w-1/5 shrink-0 px-4 py-6 flex flex-col gap-4">
        <h1 className="flex justify-center">
          <Link href="/">
            <Image className="" src="/assets/img/logo.png" alt="" width="177.6" height="194.8" />
          </Link>
        </h1>

        <div className="text-center underline">
          <SignInSignUp />
        </div>

        <div className="flex flex-col">
          <MenuItem href="/example1" icon={<HomeIcon />} label="Example 1" />

          <MenuItem href="/animal-report" icon={<AnimalIcon />} label="Zgłoś zwierzę" />

          <MenuItem href="/example1" icon={<TagsIcon />} label="Example 3" />

          <MenuItem href="/example1" icon={<UsersIcon />} label="Example 4" />
        </div>
      </div>
      <div className="bg-gray-100 w-full p-6">{children}</div>
    </div>
  );
}

function HomeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 20V9.13199L12 4.33199L4 9.13199V20H8V17.25C8 16.1891 8.42143 15.1717 9.17157 14.4216C9.92172 13.6714 10.9391 13.25 12 13.25C13.0609 13.25 14.0783 13.6714 14.8284 14.4216C15.5786 15.1717 16 16.1891 16 17.25V20H20ZM14 22V17.25C14 16.7196 13.7893 16.2108 13.4142 15.8358C13.0391 15.4607 12.5304 15.25 12 15.25C11.4696 15.25 10.9609 15.4607 10.5858 15.8358C10.2107 16.2108 10 16.7196 10 17.25V22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V9.13199C2 8.78662 2.08943 8.44713 2.25959 8.14659C2.42976 7.84604 2.67485 7.59468 2.971 7.41699L10.971 2.61699C11.2818 2.43049 11.6375 2.33197 12 2.33197C12.3625 2.33197 12.7182 2.43049 13.029 2.61699L21.029 7.41699C21.3252 7.59468 21.5702 7.84604 21.7404 8.14659C21.9106 8.44713 22 8.78662 22 9.13199V20C22 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 20 22H14Z"
        fill="#21272A"
      />
    </svg>
  );
}

function TagsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.586 18.071L13 16.657L14.414 18.071L20.579 11.906L21.669 8.354L19.185 5.871L18.106 6.207L16.508 4.609L18.591 3.96C18.9391 3.85182 19.3102 3.84085 19.6641 3.92827C20.018 4.01569 20.3413 4.19817 20.599 4.456L23.082 6.939C23.3387 7.19576 23.5207 7.51757 23.6085 7.86991C23.6962 8.22225 23.6864 8.59182 23.58 8.939L22.345 12.97L14.415 20.9L11.585 18.072L11.586 18.071ZM14.236 3.75L16.718 6.233C16.9747 6.48976 17.1567 6.81157 17.2445 7.16391C17.3322 7.51625 17.3224 7.88582 17.216 8.233L15.981 12.261L8.051 20.192L0.270996 12.414L8.17 4.516L12.227 3.254C12.5751 3.14582 12.9462 3.13485 13.3001 3.22227C13.654 3.30969 13.9773 3.49217 14.235 3.75H14.236ZM3.1 12.414L8.05 17.364L14.214 11.199L15.304 7.647L12.82 5.164L9.235 6.279L3.1 12.414ZM10.524 9.939C10.3807 9.80063 10.2665 9.63511 10.1878 9.4521C10.1092 9.2691 10.0679 9.07227 10.0661 8.8731C10.0644 8.67393 10.1023 8.47641 10.1778 8.29206C10.2532 8.10772 10.3646 7.94024 10.5054 7.7994C10.6462 7.65856 10.8137 7.54718 10.9981 7.47176C11.1824 7.39634 11.3799 7.35839 11.5791 7.36012C11.7783 7.36185 11.9751 7.40323 12.1581 7.48184C12.3411 7.56046 12.5066 7.67473 12.645 7.818C12.9135 8.1017 13.0607 8.47895 13.0554 8.86951C13.05 9.26008 12.8925 9.63316 12.6164 9.90942C12.3403 10.1857 11.9673 10.3433 11.5767 10.3489C11.1861 10.3544 10.8088 10.2073 10.525 9.939H10.524ZM17.41 10.961L18.192 8.083C18.642 8.235 18.947 8.408 19.109 8.601C19.3646 8.90575 19.4887 9.29955 19.454 9.6958C19.4194 10.0921 19.2287 10.4583 18.924 10.714C18.634 10.958 18.129 11.04 17.41 10.961Z"
        fill="#21272A"
      />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.534 12.57C5.65695 12.5175 5.78916 12.4903 5.92283 12.4898C6.0565 12.4893 6.18891 12.5156 6.31223 12.5672C6.43555 12.6188 6.54728 12.6945 6.64082 12.79C6.73436 12.8855 6.8078 12.9988 6.85681 13.1231C6.90582 13.2475 6.9294 13.3804 6.92615 13.514C6.92291 13.6477 6.8929 13.7793 6.83792 13.9011C6.78293 14.023 6.70408 14.1325 6.60602 14.2234C6.50796 14.3142 6.39268 14.3845 6.267 14.43C5.59854 14.6934 5.02483 15.1519 4.6205 15.7458C4.21618 16.3397 3.99997 17.0415 4 17.76V19.5C4 19.7652 4.10536 20.0196 4.29289 20.2071C4.48043 20.3946 4.73478 20.5 5 20.5H13C13.2652 20.5 13.5196 20.3946 13.7071 20.2071C13.8946 20.0196 14 19.7652 14 19.5V17.853C14.0001 17.1115 13.7749 16.3874 13.3541 15.7768C12.9334 15.1662 12.337 14.6979 11.644 14.434C11.5175 14.3901 11.4012 14.3213 11.3018 14.2316C11.2024 14.1419 11.1221 14.0332 11.0655 13.9119C11.009 13.7905 10.9773 13.6591 10.9725 13.5253C10.9677 13.3916 10.9897 13.2582 11.0374 13.1331C11.0851 13.008 11.1574 12.8938 11.25 12.7972C11.3427 12.7006 11.4538 12.6235 11.5767 12.5706C11.6997 12.5177 11.832 12.4901 11.9659 12.4893C12.0998 12.4885 12.2324 12.5146 12.356 12.566C13.4276 12.9742 14.3499 13.6983 15.0006 14.6425C15.6514 15.5867 15.9999 16.7063 16 17.853V19.5C16 20.2956 15.6839 21.0587 15.1213 21.6213C14.5587 22.1839 13.7956 22.5 13 22.5H5C4.20435 22.5 3.44129 22.1839 2.87868 21.6213C2.31607 21.0587 2 20.2956 2 19.5V17.76C2.00014 16.6402 2.33728 15.5463 2.96756 14.6206C3.59785 13.695 4.4921 12.9805 5.534 12.57ZM9 2.5C10.0609 2.5 11.0783 2.92143 11.8284 3.67157C12.5786 4.42172 13 5.43913 13 6.5V8.5C13 9.56087 12.5786 10.5783 11.8284 11.3284C11.0783 12.0786 10.0609 12.5 9 12.5C7.93913 12.5 6.92172 12.0786 6.17157 11.3284C5.42143 10.5783 5 9.56087 5 8.5V6.5C5 5.43913 5.42143 4.42172 6.17157 3.67157C6.92172 2.92143 7.93913 2.5 9 2.5ZM9 4.5C8.46957 4.5 7.96086 4.71071 7.58579 5.08579C7.21071 5.46086 7 5.96957 7 6.5V8.5C7 9.03043 7.21071 9.53914 7.58579 9.91421C7.96086 10.2893 8.46957 10.5 9 10.5C9.53043 10.5 10.0391 10.2893 10.4142 9.91421C10.7893 9.53914 11 9.03043 11 8.5V6.5C11 5.96957 10.7893 5.46086 10.4142 5.08579C10.0391 4.71071 9.53043 4.5 9 4.5ZM18 21.5C17.7348 21.5 17.4804 21.3946 17.2929 21.2071C17.1054 21.0196 17 20.7652 17 20.5C17 20.2348 17.1054 19.9804 17.2929 19.7929C17.4804 19.6054 17.7348 19.5 18 19.5H19C19.2652 19.5 19.5196 19.3946 19.7071 19.2071C19.8946 19.0196 20 18.7652 20 18.5V16.662C20 15.9512 19.7763 15.2583 19.3606 14.6817C18.9449 14.105 18.3584 13.6738 17.684 13.449C17.5594 13.4075 17.4441 13.3419 17.3449 13.2558C17.2456 13.1698 17.1643 13.0651 17.1055 12.9476C17.0467 12.8301 17.0117 12.7022 17.0023 12.5712C16.993 12.4402 17.0095 12.3086 17.051 12.184C17.0925 12.0594 17.1581 11.9441 17.2442 11.8449C17.3302 11.7456 17.4349 11.6643 17.5524 11.6055C17.6699 11.5467 17.7978 11.5117 17.9288 11.5023C18.0598 11.493 18.1914 11.5095 18.316 11.551C19.3888 11.9085 20.3219 12.5945 20.9831 13.5118C21.6443 14.4291 22.0001 15.5312 22 16.662V18.5C22 19.2956 21.6839 20.0587 21.1213 20.6213C20.5587 21.1839 19.7956 21.5 19 21.5H18ZM15 3.5C14.7348 3.5 14.4804 3.39464 14.2929 3.20711C14.1054 3.01957 14 2.76522 14 2.5C14 2.23478 14.1054 1.98043 14.2929 1.79289C14.4804 1.60536 14.7348 1.5 15 1.5C16.0609 1.5 17.0783 1.92143 17.8284 2.67157C18.5786 3.42172 19 4.43913 19 5.5V7.5C19 8.56087 18.5786 9.57828 17.8284 10.3284C17.0783 11.0786 16.0609 11.5 15 11.5C14.7348 11.5 14.4804 11.3946 14.2929 11.2071C14.1054 11.0196 14 10.7652 14 10.5C14 10.2348 14.1054 9.98043 14.2929 9.79289C14.4804 9.60536 14.7348 9.5 15 9.5C15.5304 9.5 16.0391 9.28929 16.4142 8.91421C16.7893 8.53914 17 8.03043 17 7.5V5.5C17 4.96957 16.7893 4.46086 16.4142 4.08579C16.0391 3.71071 15.5304 3.5 15 3.5Z"
        fill="#21272A"
      />
    </svg>
  );
}

function AnimalIcon() {
  return (
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.74077 10.7401C9.79877 11.5901 9.35077 12.3151 8.73777 12.3591C8.12577 12.4031 7.58176 11.7491 7.52376 10.8991C7.46576 10.0491 7.91477 9.32406 8.52777 9.28006C9.13977 9.23606 9.68377 9.89006 9.74077 10.7401ZM13.9578 7.21606C13.3628 7.06006 12.7148 7.60406 12.5108 8.42906C12.3048 9.25506 12.6208 10.0511 13.2158 10.2061C13.8108 10.3621 14.4598 9.81906 14.6638 8.99306C14.9308 7.91806 14.1008 7.25306 13.9578 7.21606ZM15.3528 10.0001C14.7268 10.0101 14.2308 10.6201 14.2448 11.5661C14.2578 12.5111 14.7748 12.9421 15.4018 12.9331C16.0268 12.9231 16.5238 12.4771 16.5108 11.5311C16.4918 10.3011 15.5028 9.99806 15.3528 10.0011V10.0001ZM10.8198 7.00806C10.2238 7.00806 9.74177 7.69206 9.74177 8.53606C9.74177 9.38006 10.2238 10.0641 10.8198 10.0641C11.4148 10.0641 11.8978 9.38006 11.8978 8.53606C11.8978 7.69206 11.4148 7.00806 10.8198 7.00806ZM10.6818 11.7541C10.3378 12.2611 9.94777 12.7561 9.19077 13.4041C8.43377 14.0521 8.11277 14.4991 8.11277 15.1591C8.11277 15.8191 8.47977 16.9141 9.52277 16.9141C10.5668 16.9141 11.0718 16.6781 11.8978 16.6781C12.7228 16.6781 13.2738 17.0081 14.3178 17.0081C15.3608 17.0081 15.7978 15.9951 15.7978 15.3351C15.7978 14.6751 15.6158 14.3021 14.7798 13.5501C14.2438 13.0671 13.7898 12.6731 13.0788 11.6601C12.7268 11.1601 12.3218 11.0951 11.8978 11.0951C11.4728 11.0951 11.0258 11.2481 10.6818 11.7551V11.7541Z"
        fill="#21272A"
      />
      <path
        d="M6.00977 4C5.47933 4 4.97062 4.21071 4.59555 4.58579C4.22048 4.96086 4.00977 5.46957 4.00977 6V18C4.00977 18.5304 4.22048 19.0391 4.59555 19.4142C4.97062 19.7893 5.47933 20 6.00977 20H18.0098C18.5402 20 19.0489 19.7893 19.424 19.4142C19.7991 19.0391 20.0098 18.5304 20.0098 18V6C20.0098 5.46957 19.7991 4.96086 19.424 4.58579C19.0489 4.21071 18.5402 4 18.0098 4H6.00977ZM6.00977 2H18.0098C19.0706 2 20.088 2.42143 20.8382 3.17157C21.5883 3.92172 22.0098 4.93913 22.0098 6V18C22.0098 19.0609 21.5883 20.0783 20.8382 20.8284C20.088 21.5786 19.0706 22 18.0098 22H6.00977C4.9489 22 3.93148 21.5786 3.18134 20.8284C2.43119 20.0783 2.00977 19.0609 2.00977 18V6C2.00977 4.93913 2.43119 3.92172 3.18134 3.17157C3.93148 2.42143 4.9489 2 6.00977 2V2Z"
        fill="#21272A"
      />
    </svg>
  );
}
