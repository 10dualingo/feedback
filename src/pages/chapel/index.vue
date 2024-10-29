<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const router = useRouter();

const sendButtonDisabled = ref(false);

async function send(i: string, name: string, kelas: string) {
  sendButtonDisabled.value = true;

  try {
    await fetch(
      `https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          chat_id: import.meta.env.VITE_TELEGRAM_CHAT_ID,
          text: `From ${name} (${kelas})\nFeedback: Chapel\n\n${i.trim()}`,
          disable_notification: false,
        }),
      }
    );
    router.push("/submitted");
  } catch (error) {
    console.log(error);
    router.push("/error");
  }
}

const dialogOpen = ref(false);

function setDialogOpen(value: boolean) {
  dialogOpen.value = value;
}
</script>

<script lang="ts">
export default {
  data() {
    return {
      message: "",
      name: "",
      kelas: "",
    };
  },
};
</script>

<template>
  <main class="">
    <TransitionRoot appear :show="dialogOpen" as="template">
      <Dialog as="div" @close="setDialogOpen(false)" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-[#0c0f14]/75" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-2 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-[40rem] transform overflow-hidden rounded-2xl bg-[#1c2028] p-6 text-left align-middle shadow-xl transition-all"
              >
                <div class="flex flex-row">
                  <DialogTitle
                    as="h3"
                    class="text-xl font-semibold leading-6 text-white"
                  >
                    Bentar! Sebelum kamu kirim...
                  </DialogTitle>
                </div>
                <div class="mt-2">
                  <p class="text-lg text-white/75">
                    Bolehkah aku mendapat nama dan kelas kamu untuk pesan ini?
                  </p>
                  <p class="text-white/50">
                    (Jangan khawatir, pesan kamu tidak akan disampaikan di luar
                    pengurus kelas!)
                  </p>
                </div>
                <div class="mt-4 flex flex-row gap-x-2">
                  <input
                    class="rounded-xl flex gap-x-4 h-full p-2 w-full min-h-full bg-[#1c2028] border-[#4c5056] border-[3px] text-pretty my-auto focus:outline-none resize-none text-base md:text-lg"
                    placeholder="Nama"
                    v-model="name"
                  />
                  <input
                    class="rounded-xl flex gap-x-4 h-full p-2 w-1/3 min-h-full bg-[#1c2028] border-[#4c5056] border-[3px] text-pretty my-auto focus:outline-none resize-none text-base md:text-lg"
                    placeholder="Kelas"
                    v-model="kelas"
                  />
                </div>

                <div class="mt-12">
                  <button
                    :disabled="
                      message.trim().length === 0 || sendButtonDisabled === true
                    "
                    @click="
                      send(
                        String(message),
                        String(name).trim(),
                        String(kelas).trim()
                      )
                    "
                    class="text-blue-400 hover:text-blue-300 active:text-blue-500 focus:outline-blue-400 transition ml-auto rounded-full flex flex-row text-base md:text-lg"
                  >
                    {{
                      name.trim() === ""
                        ? "Jangan dulu deh, kirim sebagai anonim saja."
                        : "Oke, kirim!"
                    }}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
    <section class="w-[40rem] h-full flex flex-col justify-center">
      <div class="mb-3 h-44 md:h-56 w-full flex-col flex gap-y-2">
        <div
          class="h-full flex flex-col p-2 border-[#494b4f] border-[3px] rounded-3xl group focus-within:border-blue-400 transition"
        >
          <label class="flex gap-x-4 h-full p-2">
            <textarea
              v-model="message"
              name="message"
              placeholder="Silahkan tinggalkan pesan atau masukan tentang pelayanan chapel kami!"
              class="w-full min-h-full bg-[#0c0f14] text-pretty my-auto focus:outline-none resize-none text-base md:text-lg"
            />
          </label>
        </div>
        <button
          :disabled="message.trim().length === 0 || sendButtonDisabled === true"
          @click="setDialogOpen(true)"
          class="disabled:text-gray-400 disabled:hover:text-gray-400 text-blue-400 hover:text-blue-300 active:text-blue-500 focus:outline-blue-400 transition ml-auto rounded-full flex flex-row text-base md:text-lg"
        >
          Kirim!
        </button>
      </div>
      <hr class="border-[#86878a] border-2" />
      <div
        class="mt-6 w-fit mx-auto mb-6 flex flex-col gap-y-1 text-center md:flex-row gap-x-1 md:text-base text-sm"
      >
        <router-link
          to="/kebijakan-privasi"
          class="underline text-blue-500 hover:text-blue-400 active:text-blue-600 focus:outline-blue-500 transition"
          >Kebijakan privasi</router-link
        >
      </div>
    </section>
  </main>
</template>
