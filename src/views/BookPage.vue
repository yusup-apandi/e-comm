<template>
  <Navbar />

  <main>
    <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="py-24 text-center">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900">Buku Terbaru</h1>
        <p class="mx-auto mt-4 max-w-3xl text-base text-gray-500">
          Jelajahi koleksi terbaru buku kami dari berbagai kategori.
        </p>
      </div>

      <!-- Filters -->
      <section aria-labelledby="filter-heading" class="border-t border-gray-200 pt-6">
        <h2 id="filter-heading" class="sr-only">Filter Produk</h2>

        <div class="flex items-center justify-between">
          <Menu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                Urutkan
                <ChevronDownIcon class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
              </MenuButton>
            </div>

            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="py-1">
                  <MenuItem v-for="option in sortOptions" :key="option.name" v-slot="{ active }">
                    <a :href="option.href" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm font-medium text-gray-900']">{{ option.name }}</a>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>

          <button type="button" class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden" @click="mobileFiltersOpen = true">
            Filter
          </button>

          <PopoverGroup class="hidden sm:flex sm:items-baseline sm:space-x-8">
            <Popover as="div" v-for="(section, sectionIdx) in filters" :key="section.name" id="menu" class="relative inline-block text-left">
              <div>
                <PopoverButton class="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  <span>{{ section.name }}</span>
                  <ChevronDownIcon class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                </PopoverButton>
              </div>

              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <PopoverPanel class="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <form class="space-y-4">
                    <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center">
                      <input :id="`filter-${section.id}-${optionIdx}`" :name="`${section.id}[]`" :value="option.value" :checked="option.checked" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <label :for="`filter-${section.id}-${optionIdx}`" class="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900">{{ option.label }}</label>
                    </div>
                  </form>
                </PopoverPanel>
              </transition>
            </Popover>
          </PopoverGroup>
        </div>
      </section>

      <!-- Mobile Filter Dialog -->
      <transition name="dialog" @before-enter="beforeEnter" @after-leave="afterLeave">
        <div v-if="mobileFiltersOpen" class="fixed inset-0 flex z-40 sm:hidden">
          <transition
            enter-active-class="transition-opacity ease-linear duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity ease-linear duration-300"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div class="fixed inset-0 bg-black bg-opacity-25" @click="mobileFiltersOpen = false" aria-hidden="true" />
          </transition>

          <transition
            enter-active-class="transition ease-in-out duration-300 transform"
            enter-from-class="translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transition ease-in-out duration-300 transform"
            leave-from-class="translate-x-0"
            leave-to-class="translate-x-full"
          >
            <div class="relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
              <div class="px-4 flex items-center justify-between">
                <h2 class="text-lg font-medium text-gray-900">Filter</h2>
                <button type="button" class="-mr-2 flex items-center justify-center h-10 w-10 rounded-md text-gray-400 hover:text-gray-500" @click="mobileFiltersOpen = false">
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <!-- Filters -->
              <form class="mt-4 border-t border-gray-200">
                <h3 class="sr-only">Categories</h3>
                <ul role="list" class="font-medium text-gray-900 px-2 py-3">
                  <li v-for="category in filters[0].options" :key="category.value">
                    <a :href="`#${category.value}`" class="block px-2 py-3">{{ category.label }}</a>
                  </li>
                </ul>

                <div class="border-t border-gray-200 px-4 py-6">
                  <h3 class="-mx-2 -my-3 flow-root">
                    <button type="button" class="py-3 w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-1" @click="toggleSection('section-1')">
                      <span class="font-medium text-gray-900">Kategori</span>
                      <span class="ml-6 flex items-center">
                        <ChevronDownIcon class="h-5 w-5 transform" :class="{ 'rotate-180': openSections['section-1'] }" aria-hidden="true" />
                      </span>
                    </button>
                  </h3>
                  <transition name="section-1">
                    <div class="pt-6" v-show="openSections['section-1']" id="filter-section-1">
                      <div class="space-y-4">
                        <div v-for="option in filters[0].options" :key="option.value" class="flex items-center">
                          <input :id="`filter-mobile-${filters[0].id}-${option.value}`" :name="`${filters[0].id}[]`" :value="option.value" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                          <label :for="`filter-mobile-${filters[0].id}-${option.value}`" class="ml-3 text-sm text-gray-500">{{ option.label }}</label>
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>

                <div class="border-t border-gray-200 px-4 py-6">
                  <h3 class="-mx-2 -my-3 flow-root">
                    <button type="button" class="py-3 w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-2" @click="toggleSection('section-2')">
                      <span class="font-medium text-gray-900">Pengarang</span>
                      <span class="ml-6 flex items-center">
                        <ChevronDownIcon class="h-5 w-5 transform" :class="{ 'rotate-180': openSections['section-2'] }" aria-hidden="true" />
                      </span>
                    </button>
                  </h3>
                  <transition name="section-2">
                    <div class="pt-6" v-show="openSections['section-2']" id="filter-section-2">
                      <div class="space-y-4">
                        <div v-for="option in filters[1].options" :key="option.value" class="flex items-center">
                          <input :id="`filter-mobile-${filters[1].id}-${option.value}`" :name="`${filters[1].id}[]`" :value="option.value" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                          <label :for="`filter-mobile-${filters[1].id}-${option.value}`" class="ml-3 text-sm text-gray-500">{{ option.label }}</label>
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>

                <div class="border-t border-gray-200 px-4 py-6">
                  <h3 class="-mx-2 -my-3 flow-root">
                    <button type="button" class="py-3 w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-3" @click="toggleSection('section-3')">
                      <span class="font-medium text-gray-900">Harga</span>
                      <span class="ml-6 flex items-center">
                        <ChevronDownIcon class="h-5 w-5 transform" :class="{ 'rotate-180': openSections['section-3'] }" aria-hidden="true" />
                      </span>
                    </button>
                  </h3>
                  <transition name="section-3">
                    <div class="pt-6" v-show="openSections['section-3']" id="filter-section-3">
                      <div class="space-y-4">
                        <div v-for="option in filters[2].options" :key="option.value" class="flex items-center">
                          <input :id="`filter-mobile-${filters[2].id}-${option.value}`" :name="`${filters[2].id}[]`" :value="option.value" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                          <label :for="`filter-mobile-${filters[2].id}-${option.value}`" class="ml-3 text-sm text-gray-500">{{ option.label }}</label>
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>
              </form>
            </div>
          </transition>
        </div>
      </transition>

      <!-- Product grid -->
      <section aria-labelledby="products-heading" class="mt-8">
        <h2 id="products-heading" class="sr-only">Buku</h2>

        <div class="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <a v-for="book in books" :key="book.id" href="/detailbuku" class="group">
            <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg sm:aspect-w-2 sm:aspect-h-3">
              <img :src="book.imageSrc" :alt="book.imageAlt" class="h-full w-full object-cover object-center group-hover:opacity-75" />
            </div>
            <div class="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
              <h3>{{ book.title }}</h3>
            </div>
            <p class="mt-1 text-sm italic text-gray-500">{{ book.year }} oleh {{ book.author }}</p>
            <p class="mt-1 text-base font-medium text-gray-900">{{ formatCurrency(book.price) }}</p>
          </a>
        </div>
      </section>
    </div>
  </main>

  <Footer />
</template>

<script setup>
import { ref } from 'vue'

import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel
} from '@headlessui/vue'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/vue/20/solid'

const sortOptions = [
  { name: 'Paling Populer', href: '#' },
  { name: 'Terbaru', href: '#' },
  { name: 'Harga: Rendah ke Tinggi', href: '#' },
  { name: 'Harga: Tinggi ke Rendah', href: '#' },
]

const filters = [
  {
    id: 'category',
    name: 'Kategori',
    options: [
      { value: 'school', label: 'Buku Sekolah' },
      { value: 'college', label: 'Buku Kuliah' },
      { value: 'novel', label: 'Novel' },
      { value: 'self-help', label: 'Self Help' },
    ],
  },
  {
    id: 'author',
    name: 'Pengarang',
    options: [
      { value: 'author1', label: 'Pengarang 1' },
      { value: 'author2', label: 'Pengarang 2' },
      { value: 'author3', label: 'Pengarang 3' },
    ],
  },
  {
    id: 'price',
    name: 'Harga',
    options: [
      { value: 'under-50', label: 'Di bawah Rp 50.000' },
      { value: '50-100', label: 'Rp 50.000 - Rp 100.000' },
      { value: '100-200', label: 'Rp 100.000 - Rp 200.000' },
    ],
  },
]

const books = [
  {
    id: 1,
    title: 'Judul Buku 1',
    href: './bookdetail',
    price: 25000,
    year: '2020',
    author: 'Pengarang 1',
    imageSrc: 'https://via.placeholder.com/150',
    imageAlt: 'Sampul Buku Judul Buku 1',
  },
  {
    id: 2,
    title: 'Judul Buku 2',
    href: './bookdetail',
    price: 30000,
    year: '2019',
    author: 'Pengarang 2',
    imageSrc: 'https://via.placeholder.com/150',
    imageAlt: 'Sampul Buku Judul Buku 2',
  },
  {
    id: 3,
    title: 'Judul Buku 3',
    href: './bookdetail',
    price: 45000,
    year: '2021',
    author: 'Pengarang 3',
    imageSrc: 'https://via.placeholder.com/150',
    imageAlt: 'Sampul Buku Judul Buku 3',
  },
  {
    id: 4,
    title: 'Judul Buku 4',
    href: './bookdetail',
    price: 35000,
    year: '2018',
    author: 'Pengarang 4',
    imageSrc: 'https://via.placeholder.com/150',
    imageAlt: 'Sampul Buku Judul Buku 4',
  },
  {
    id: 5,
    title: 'Judul Buku 5',
    href: './bookdetail',
    price: 40000,
    year: '2022',
    author: 'Pengarang 5',
    imageSrc: 'https://via.placeholder.com/150',
    imageAlt: 'Sampul Buku Judul Buku 5',
  },
  {
    id: 6,
    title: 'Judul Buku 6',
    href: './bookdetail',
    price: 50000,
    year: '2021',
    author: 'Pengarang 6',
    imageSrc: 'https://via.placeholder.com/150',
    imageAlt: 'Sampul Buku Judul Buku 6',
  },
  {
    id: 7,
    title: 'Judul Buku 7',
    href: './bookdetail',
    price: 60000,
    year: '2020',
    author: 'Pengarang 7',
    imageSrc: 'https://via.placeholder.com/150',
    imageAlt: 'Sampul Buku Judul Buku 7',
  },
  {
    id: 8,
    title: 'Judul Buku 8',
    href: './bookdetail',
    price: 70000,
    year: '2019',
    author: 'Pengarang 8',
    imageSrc: 'https://via.placeholder.com/150',
    imageAlt: 'Sampul Buku Judul Buku 8',
  },
]

const mobileFiltersOpen = ref(false)
const openSections = ref({
  'section-1': false,
  'section-2': false,
  'section-3': false
})

function formatCurrency(value) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
}

function toggleSection(section) {
  openSections.value[section] = !openSections.value[section]
}
</script>

<style scoped>
  .rotate-180 {
    transform: rotate(180deg);
  }
</style>
