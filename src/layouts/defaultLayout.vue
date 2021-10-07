<template>
    <div class="container bg-base-200">
        <!-- <Sidebar/> -->
        <div class="h-full">
            <Header/>
            <div class="bg-gray-200 h-screen">
                <div class="card-body py-5">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>