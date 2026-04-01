<script setup>
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import LoopTypeWriter from '@/components/LoopTypeWriter/LoopTypeWriter.vue';
import img from '@/assets/1.png'

</script>

<template>
  <div class="flex justify-center m-4">
    <Avatar class="w-48 h-48 border border-ring/50">
      <AvatarImage :src="img" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </div>

  <div class="my-14">
  <Card>
    <CardHeader>
      <CardTitle class="text-lg">Malusnow</CardTitle>
      <CardDescription>Frontend Developer | CS Student at HEU</CardDescription>
    </CardHeader>
    <CardContent>
      <ul class="flex flex-wrap gap-2">
        <li>📍 Harbin, China</li>
        <li>💻 Passionate about web development</li>
        <li>🎬 Cinema enthusiast</li>
      </ul>
    </CardContent>
    <CardFooter class="ml-1">
      <LoopTypeWriter />
    </CardFooter>
  </Card>
  </div>
</template>