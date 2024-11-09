<template>
    <div class="pt-5 pl-5 flex w-full flex-col lg:flex-row bg-white">
        <div class="h-ful w-fit">
            <div
                class="w-10 h-10 rounded-full flex justify-center items-center hover:bg-[#FEF6DF] cursor-pointer border shadow bg-white" @click="goBack">
                <i class="fa-solid fa-arrow-left"></i>
            </div>
        </div>
        <div class="flex-1 flex overflow-hidden">
            <div class="w-full h-full">
                <div class="h-full flex justify-center flex-col lg:flex-row items-center overflow-y-auto overflow-x-hidden rounded-lg"
                    style="scrollbar-gutter: stable;">
                    <div class="h-full w-fit overflow-hidden p-5 lg:p-20">
                        <img :src="imageUrl" alt="" class="object-contain h-full w-auto min-w-fit rounded-md shadow-lg">
                    </div>
                    <div
                        class="h-1/3 w-fit lg:h-full p-5 flex flex-col rounded-lg">
                        <div class="h-fit w-full flex flex-row">
                            <div class="flex-1 h-full flex flex-col">
                                <div class="flex justify-between items-center mb-5">
                                    <span class="text-xl font-semibold px-4">{{ book.TenSach }}</span>
                                </div>
                                <div class="flex-1">
                                    <table class="table-auto w-full border-collapse">
                                        <tbody>
                                            <tr>
                                                <td
                                                    class="px-4 py-2 font-semibold whitespace-nowrap align-top">
                                                    Mã sách</td>
                                                <td class="px-4 py-2 whitespace-nowrap align-top">
                                                    {{ book.MaSach }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    class="px-4 py-2 font-semibold whitespace-nowrap align-top">
                                                    Thể loại</td>
                                                <td class="px-4 py-2 align-top">{{ book.TheLoai.TenMucSach }}</td>
                                            </tr>
                                            <tr>
                                                <td
                                                    class="px-4 py-2 font-semibold whitespace-nowrap align-top">Tác giả</td>
                                                <td class="px-4 py-2 align-top">{{ book.TacGia }}</td>
                                            </tr>
                                            <tr>
                                                <td
                                                    class="px-4 py-2 font-semibold whitespace-nowrap align-top">
                                                    Nhà xuất bản
                                                </td>
                                                <td class="px-4 py-2 align-top">{{ book.NXB.TenNXB }}</td>
                                            </tr>
                                            <tr>
                                                <td
                                                    class="px-4 py-2 font-semibold whitespace-nowrap align-top">
                                                    Năm xuất bản
                                                </td>
                                                <td class="px-4 py-2 whitespace-nowrap align-top">{{ book.NamXuatBan }}</td>
                                            </tr>
                                            <tr>
                                                <td
                                                    class="px-4 py-2 font-semibold whitespace-nowrap align-top">
                                                    Số lượng</td>
                                                <td class="px-4 py-2 whitespace-nowrap align-top"> {{ book.SoLuongHienTai }} quyển
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    class="px-4 py-2 font-semibold whitespace-nowrap align-top">
                                                    Đơn giá</td>
                                                <td class="px-4 py-2 whitespace-nowrap align-top">
                                                    {{ formatCurrency(book.DonGia) }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
    
                                </div>
                            </div>
                        </div>
                        <div class=" h-fit w-full flex justify-end py-10">
                            <div class="flex flex-1 h-full justify-end">
                                <button @click="confirmSave" class="rounded-xl hover:bg-[#FEF6DF] bg-[#FFD573] px-5 py-3">Đăng ký
                                    mượn</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import book_service from '@/services/book_service';
import user_service from '@/services/user_service';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
import Swal from 'sweetalert2';
import { useToast } from 'vue-toastification';
const toast = useToast();
const props = defineProps({
  id: {
    type: Object,
  },
});

const goBack = () => {
    router.go(-1);
}
const imageUrl = ref(null);

const getImg = async (id) => {
    const blob = await book_service.getImg(id);
    imageUrl.value = URL.createObjectURL(blob);
};

const formatCurrency = (value) => {
        if (value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' vnd';
        }
        return '0 vnd';
    }

const book = ref({
  MaSach: '',
  TenSach: '',
  TacGia: '',
  NamXuatBan: 0,
  DonGia: 0,
  BiaSach: '',
  NXB: '',
  TheLoai: '',
  SoLuongHienTai: 0
});

const getBook = async () => {
    try {
        const response = await book_service.get(props.id);
        book.value = response;
        getImg(book.value.BiaSach);
    } catch (error) {
        console.log(error);
    }
};

const confirmSave = async () => {
    if (userData.value) {
        const result = await Swal.fire({
            title: 'Xác nhận đăng ký mượn?',
            text: "Bạn có chắc muốn đăng ký để mượn quyển sách này?\n\nBạn có thể đến nhận sách tại quầy sau khi đăng ký.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy',
        });
        if (result.isConfirmed) {
            await borrow();
        }
    } else {
        router.push({ name: 'login' });
    }
  
};

const borrow = async () => {
    try {
        const currentDate = new Date();
        const data = {
        ID_DocGia: userData.value._id,
        ID_Sach: props.id,
        NgayMuon: currentDate,
        TrangThai: 'DangKy',
        };
        const response = await user_service.borrow(data);
        toast.success(response.message);
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.';
        toast.error(errorMessage);
    }
}

import { useStore } from 'vuex';
const store = useStore();

const userData = computed(() => store.getters.userData);

onMounted(async () => {
    try {
    getBook();
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.';
    toast.error(errorMessage);
  }
});

</script>