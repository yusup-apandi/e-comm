<template>
  <header class="relative bg-white">
    <nav aria-label="Top" class="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="relative border-b border-gray-200 px-4 pb-14 sm:static sm:px-0 sm:pb-0">
        <div class="flex h-16 items-center justify-between">
          <!-- Logo -->
          <div class="flex flex-1">
            <a href="#">
              <span class="sr-only">Your Company</span>
              <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Logo" />
            </a>
          </div>

          <div class="absolute inset-x-0 bottom-0 overflow-x-auto border-t sm:static sm:border-t-0">
            <div class="flex h-14 items-center space-x-8 px-4 sm:h-auto">
              <!-- Dropdown Menu for Buku Sekolah -->
              <div class="relative" @click="toggleDropdown" style="z-index: 10;">
                <button class="text-sm font-medium text-gray-700 hover:text-gray-800">
                  Buku Sekolah
                </button>
                <div v-if="showDropdown" class="absolute left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg">
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Buku TK</a>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Buku SD</a>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Buku SMP</a>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Buku SMA</a>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Kuliah</a>
                </div>
              </div>
              <a href="#" class="text-sm font-medium text-gray-700 hover:text-gray-800">Buku Umum</a>
              <a href="#" class="text-sm font-medium text-gray-700 hover:text-gray-800">E-Book</a>
              <a href="#" class="text-sm font-medium text-gray-700 hover:text-gray-800">E-Library</a>
            </div>
          </div>

          <div class="flex flex-1 items-center justify-end">
            <!-- Search -->
            <button @click="showCommandPalette = true" class="p-2 text-gray-400 hover:text-gray-500">
              <span class="sr-only">Search</span>
              <MagnifyingGlassIcon class="h-6 w-6" aria-hidden="true" />
            </button>
            <div v-if="showCommandPalette" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50" v-click-outside="closeCommandPalette">
              <div class="bg-white p-6 rounded-lg shadow-lg">
                <input v-model="searchQuery" type="text" placeholder="Search by title or author" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <button @click="searchBooks" class="mt-4 w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Search</button>
              </div>
            </div>

            <!-- Cart -->
            <Popover class="mx-4 flow-root text-sm lg:relative lg:ml-8 z-50">
              <PopoverButton class="group -m-2 flex items-center p-2">
                <ShoppingBagIcon class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{{ totalItems }}</span>
                <span class="sr-only">items in cart, view bag</span>
              </PopoverButton>
              <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100" leave-to-class="opacity-0">
                <PopoverPanel class="absolute inset-x-0 top-16 mt-px bg-white pb-6 shadow-lg sm:px-2 lg:top-full lg:left-auto lg:right-0 lg:mt-3 lg:-mr-1.5 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5">
                  <h2 class="sr-only">Shopping Cart</h2>

                  <form class="mx-auto max-w-2xl px-4">
                    <ul role="list" class="divide-y divide-gray-200">
                      <li v-for="item in cartItems" :key="item.id" class="flex items-center py-6">
                        <img :src="item.imageSrc" :alt="item.imageAlt" class="h-16 w-16 flex-none rounded-md border border-gray-200" />
                        <div class="ml-4 flex-auto">
                          <h3 class="font-medium text-gray-900">
                            <a :href="item.href">{{ item.name }}</a>
                          </h3>
                          <p class="text-gray-500">{{ item.price }}</p>
                          <div class="flex items-center space-x-2">
                            <button @click.prevent="decreaseQuantity(item)" class="p-1 text-gray-500 hover:text-gray-700">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 010 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
                              </svg>
                            </button>
                            <span>{{ item.quantity }}</span>
                            <button @click.prevent="increaseQuantity(item)" class="p-1 text-gray-500 hover:text-gray-700">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v8a1 1 0 11-2 0V6a1 1 0 011-1z" clip-rule="evenodd" />
                                <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 010 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </li>
                    </ul>

                    <div class="mt-4">
                      <p class="text-lg font-medium text-gray-900">Total: {{ totalPrice }}</p>
                    </div>

                    <button type="submit" @click.prevent="checkout" class="mt-4 w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">Checkout via WhatsApp</button>

                    <p class="mt-6 text-center">
                      <a href="#" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">View Shopping Bag</a>
                    </p>
                  </form>
                </PopoverPanel>
              </transition>
            </Popover>
            <Button text="Login"></Button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/vue/24/outline'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import Button from './Button.vue'
import { ref, computed } from 'vue'

// Custom directive for click outside
const clickOutside = {
  beforeMount(el, binding) {
    el.clickOutsideEvent = function(event) {
      if (!(el == event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  }
};

// State variables
const showDropdown = ref(false);
const showCommandPalette = ref(false);
const searchQuery = ref('');

// Sample cart items
const cartItems = ref([
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    price: 'Rp 150,000',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    price: 'Rp 200,000',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt: 'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More products...
]);

// Computed total price
const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + (parseInt(item.price.replace('Rp ', '').replace(',', '')) * item.quantity);
  }, 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
});

// Computed total items in cart
const totalItems = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
});

// Functions to increase/decrease quantity
const increaseQuantity = (item) => {
  item.quantity++;
};

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--;
  }
};

// Function to toggle dropdown
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

// Function to close command palette
const closeCommandPalette = () => {
  showCommandPalette.value = false;
};

// Function to handle search
const searchBooks = () => {
  // Implement search logic here
  showCommandPalette.value = false;
};

// Function to handle checkout
const checkout = () => {
  const message = cartItems.value.map(item => `${item.name} - ${item.quantity}x`).join('\n');
  const whatsappLink = `https://wa.me/yourwhatsappnumber?text=${encodeURIComponent(`Checkout items:\n${message}\nTotal: ${totalPrice.value}`)}`;
  window.open(whatsappLink, '_blank');
};
</script>

<style scoped>
.relative:hover .group-hover\:block {
  display: block;
}
</style>
