<template>
    <Navbar />
  <div class="bg-white">
    <div class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        <!-- Image gallery -->
        <TabGroup as="div" class="flex flex-col-reverse">
          <!-- Image selector -->
          <div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
            <TabList class="grid grid-cols-4 gap-6">
              <Tab v-for="image in buku.images" :key="image.id" class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4" v-slot="{ selected }">
                <span class="sr-only"> {{ image.name }} </span>
                <span class="absolute inset-0 overflow-hidden rounded-md">
                  <img :src="image.src" alt="" class="h-full w-full object-cover object-center" />
                </span>
                <span :class="[selected ? 'ring-indigo-500' : 'ring-transparent', 'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2']" aria-hidden="true" />
              </Tab>
            </TabList>
          </div>

          <TabPanels class="aspect-w-1 aspect-h-1 w-full">
            <TabPanel v-for="image in buku.images" :key="image.id">
              <img :src="image.src" :alt="image.alt" class="h-full w-full object-cover object-center sm:rounded-lg" />
            </TabPanel>
          </TabPanels>
        </TabGroup>

        <!-- Informasi Buku -->
        <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ buku.name }}</h1>

          <div class="mt-3">
            <h2 class="sr-only">Informasi Buku</h2>
            <p class="text-3xl tracking-tight text-gray-900">{{ buku.price }}</p>
          </div>

          <!-- Ulasan -->
          <div class="mt-3">
            <h3 class="sr-only">Ulasan</h3>
            <div class="flex items-center">
              <div class="flex items-center">
                <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="[buku.rating > rating ? 'text-indigo-500' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']" aria-hidden="true" />
              </div>
              <p class="sr-only">{{ buku.rating }} dari 5 bintang</p>
            </div>
          </div>

          <div class="mt-6">
            <h3 class="sr-only">Deskripsi</h3>

            <div class="space-y-6 text-base text-gray-700" v-html="buku.description" />
          </div>

          <form class="mt-6">
            <div class="sm:flex-col1 mt-10 flex">
              <button type="submit" class="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full">Tambahkan ke Kerajang</button>

            </div>
          </form>

          <section aria-labelledby="details-heading" class="mt-12">
            <h2 id="details-heading" class="sr-only">Detail Tambahan</h2>

            <div class="divide-y divide-gray-200 border-t">
              <Disclosure as="div" v-for="detail in buku.details" :key="detail.name" v-slot="{ open }">
                <h3>
                  <DisclosureButton class="group relative flex w-full items-center justify-between py-6 text-left">
                    <span :class="[open ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium']">{{ detail.name }}</span>
                    <span class="ml-6 flex items-center">
                      <PlusIcon v-if="!open" class="block h-6 w-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                      <MinusIcon v-else class="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500" aria-hidden="true" />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel as="div" class="prose prose-sm pb-6">
                  <ul role="list">
                    <li v-for="item in detail.items" :key="item">{{ item }}</li>
                  </ul>
                </DisclosurePanel>
              </Disclosure>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
    <Footer />
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/vue'
import { StarIcon } from '@heroicons/vue/20/solid'
import { HeartIcon, MinusIcon, PlusIcon } from '@heroicons/vue/24/outline'

const buku = {
  name: 'Judul Buku Contoh',
  price: 'Rp 200.000',
  rating: 4,
  images: [
    {
      id: 1,
      name: 'Gambar Sampul',
      src: 'https://shop.bukuerlangga.com/uploads/cover/0043710280.jpg',
      alt: 'Gambar sampul buku contoh',
    },
    {
      id: 2,
      name: 'Gambar Sampul 2',
      src: 'https://shop.bukuerlangga.com/uploads/cover/0043710280.jpg',
      alt: 'Gambar sampul buku contoh 2',
    },
    {
      id: 3,
      name: 'Gambar Sampul 3',
      src: 'https://shop.bukuerlangga.com/uploads/cover/0043710280.jpg',
      alt: 'Gambar sampul buku contoh 3',
    },
    // More images...
  ],
  description: `
    <p>Deskripsi buku contoh ada di sini.</p>
  `,
  details: [
    {
      name: 'Spesifikasi Buku',
      items: [
        'ISBN: 0045000350',
        'Kurikulum: KM',
        'Berat Buku: 400 gram',
        'Jumlah Halaman: 100 halaman',
      ],
    },
    // More sections...
  ],
}

</script>
