<script setup>
import { ref, toRefs, watch } from 'vue'
const client = useSupabaseClient(); 

const prop = defineProps(['path', 'size', 'storage'])
const { path, size } = toRefs(prop)

const emit = defineEmits(['upload', 'update:path'])
const uploading = ref(false)
const src = ref('')
const files = ref()

const downloadImage = async () => {
    try {
        const { data, error } = await client.storage
            .from(prop.storage)
            .download(path.value)
        if (error) throw error
        src.value = URL.createObjectURL(data)
    } catch (error) {
        console.error('Error downloading image: ', error.message)
    }
}

const uploadFile = async (evt) => {
    files.value = evt.target.files
    try {
        uploading.value = true
        if (!files.value || files.value.length === 0) {
            throw new Error('You must select an image to upload.')
        }

        const file = files.value[0]
        const fileExt = file.name.split('.').pop()
        const filePath = `${Math.random()}.${fileExt}`

        let { error: uploadError } = await client.storage
            .from(prop.storage)
            .upload(filePath, file)

        if (uploadError) throw uploadError
        emit('update:path', filePath)
        emit('upload')
    } catch (error) {
        alert(error.message)
    } finally {
        uploading.value = false
    }
}

watch(path, () => {
    if (path.value) downloadImage()
})

onMounted(() => {
    downloadImage()
})
</script>

<template>
    <div>
        <img v-if="src" :src="src" class="border mb-5 rounded-full"
            :style="{ height: size + 'em', width: size + 'em' }" />
        <div v-else class="no-image" :style="{ height: size + 'em', width: size + 'em' }" />

        <div :style="{ width: size + 'em' }">
            <label class="inline-flex items-center rounded border border-transparent bg-primary px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mb-3" for="single">
                {{ uploading ? "Uploading ..." : "Upload" }}
            </label>

                <div class="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div class="space-y-1 text-center">
                  <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                   a <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span>Upload a file</span>
                      <input :disabled="uploading" @change="uploadFile" type="file" id="single" accept="image/*" class="sr-only">
                    </label>
            
                  </div>
                  <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
        </div>
    </div>
</template>
  