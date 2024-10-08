<template>
    <div class="h-full flex items-center space-x-2 relative cursor-pointer">
        <div class="h-10 w-10 rounded-full box-border cursor-pointer" onclick="openUserProfile(event)">
            <img src="../assets/pic/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg" alt=""
                class="rounded-full object-cover">
        </div>
        <div id="user_profile"
            class="absolute top-full right-0 bg-slate-800 rounded-xl w-fit h-fit hidden flex-col items-center overflow-hidden shadow-lg">
            <div class="relative mt-16 bg-white w-full h-fit flex flex-col items-center">
                <div
                    class="h-16 w-16 rounded-full border-2 border-slate-800 absolute right-1/2 top-0 translate-x-1/2 -translate-y-1/2">
                    <img src="../assets/pic/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg" alt=""
                        class="rounded-full object-cover">
                </div>
                <div class="justify-center flex flex-col items-center mt-10 w-fit px-10">
                    <span class="text-lg font-medium whitespace-nowrap">UserName</span>
                    <span class="whitespace-nowrap">tranhuynhchuong@gmail.com</span>
                </div>
                <div class="flex flex-col mt-5 mb-2 w-full">
                    <button class="py-2 hover:bg-blue-200 text-start px-6 whitespace-nowrap">
                        <i class="fa-solid fa-pen-to-square mr-3"></i>
                        Tùy chỉnh hồ sơ
                    </button>
                    <button class="py-2 hover:bg-blue-200 text-start px-6 whitespace-nowrap">
                        <i class="fa-solid fa-arrow-right-from-bracket mr-3"></i>
                        Đăng xuất
                    </button>
                </div>
            </div>
        </div>
        <div class="flex flex-1 items-center space-x-1 hidden">
            <button class="px-5 py-2 bg-slate-200 rounded-lg border-2 hover:border-green-400">Đăng
                nhập</button>
            <button class="px-5 py-2 bg-green-300 rounded-lg border-2 hover:border-green-400">Đăng
                ký</button>
        </div>
    </div>
</template>