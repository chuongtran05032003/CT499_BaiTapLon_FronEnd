<template>
    <div class="h-fit flex-1  flex items-center justify-center max-[480px]:justify-end pl-5">
        <div id="close_search" class=" h-10 w-10 rounded-full hidden justify-center items-center" @clik="closeSearch">
            <i class="fa-solid fa-arrow-left"></i>
        </div>
        <div id="search_bar"
            class="h-fit grow-0 shrink basis-2/3 rounded-full bg-white flex items-center mx-2 space-x-1 border border-slate-500 max-[480px]:basis-0 focus-within:border-blue-500 cursor-pointer">
            <div id="open_search" class="h-10 w-10 rounded-full flex bg-white items-center justify-center" @click="openSearch">
                <i class="fa-solid fa-magnifying-glass"></i>
            </div>
            <div class="flex-1 max-[480px]:hidden flex items-center">
                <input id="search_input" type="text"
                    class="bg-white h-8 focus:outline-none text-base w-full min-w-20"
                    placeholder="Tìm kiếm..."
                    @input="toggleClearButton">
                <div id="clear_searchInput"
                    class="hidden items-center justify-center w-fit h-fit p-2 hover:bg-slate-300 rounded-full"
                    @click="clearSearch">
                    <i class="fa-solid fa-circle-xmark"></i>
                </div>
            </div>
            <div @click="openSearchDetail"
                class="h-10 w-12 rounded-r-full bg-white max-[480px]:hidden flex items-center justify-center border-l border-slate-500">
                <i class="fa-solid fa-sliders"></i>
            </div>
        </div>
    </div>
</template>
<script setup>
import $ from 'jquery';
    function clearSearch() {
        $('#search_input').val('');
        $('#search_input').focus();
        $('#clear_searchInput').removeClass('flex').addClass('hidden');
    };

    function toggleClearButton() {
        let inputValue = $('#search_input').val();
        if (inputValue !== "") {
            $('#clear_searchInput').removeClass('hidden').addClass('flex');
        } else {
            $('#clear_searchInput').removeClass('flex').addClass('hidden');
        }
    };


    function openSearch() {
        if ($('#search_bar').width() == 40) {
            $('#search_bar').removeClass('max-[480px]:basis-0 grow-0 shrink basis-2/3').addClass('flex-1');
            $('#search_bar div').removeClass('max-[480px]:hidden');
            $('#close_search').removeClass('hidden').addClass('flex');

            $('header > div:nth-child(1)').removeClass('flex').addClass('hidden');
            $('header > div:nth-child(3)').removeClass('flex').addClass('hidden');
        }
    };

    function closeSearch() {
        $('#close_search').removeClass('flex').addClass('hidden');
        $('#search_bar').removeClass('flex-1').addClass('max-[480px]:basis-0 grow-0 shrink basis-2/3');
        $('#search_bar > div:nth-child(2)').addClass('max-[480px]:hidden');
        $('#search_bar > div:nth-child(3)').addClass('max-[480px]:hidden');

        $('header > div:nth-child(1)').removeClass('hidden').addClass('flex');
        $('header > div:nth-child(3)').removeClass('hidden').addClass('flex');
    };

    function searchBarResize() {
        if ($(window).width() > 480) {
            $('#close_search').removeClass('flex').addClass('hidden');
            $('#search_bar').removeClass('flex-1').addClass('max-[480px]:basis-0 grow-0 shrink basis-2/3');
            $('#search_bar > div:nth-child(2)').addClass('max-[480px]:hidden');
            $('#search_bar > div:nth-child(3)').addClass('max-[480px]:hidden');

            $('header > div:nth-child(1)').removeClass('hidden').addClass('flex');
            $('header > div:nth-child(3)').removeClass('hidden').addClass('flex');
        }
    }
    $(window).resize(searchBarResize);
    // Gọi hàm để áp dụng ngay khi trang được tải
    $(document).ready(function () {
        searchBarResize(); // Đảm bảo nav được điều chỉnh ngay từ đầu
    });

    function openSearchDetail() {
        $('#search_detail').removeClass('hidden').addClass('flex');
    }
</script>