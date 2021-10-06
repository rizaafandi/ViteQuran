<template>
    <div class="container bg-base-200 h-screen flex flex-row">
        <!-- <Sidebar/> -->
        <div class="w-full flex flex-col h-full">
            <Header/>
            <div class="bg-gray-200 h-full overflow-x-hidden" id="content">
                <div class="card-body py-5">
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <!-- <div class="w-80"></div> -->
    </div>
</template>
<style lang="scss" scoped>
::-webkit-scrollbar {
    background-color: rgba(229, 231, 235, 1);
    width: 16px
}
::-webkit-scrollbar-track {
    background-color: rgba(229, 231, 235, 1)
}
::-webkit-scrollbar-thumb {
    background-color: #babac0;
    border-radius: 16px;
    border: 5px solid rgba(229, 231, 235, 1);
    &::hover{
        background-color: #a0a0a5;
        border: 4px solid rgba(229, 231, 235, 1);
    }
}
::-webkit-scrollbar-button {
    display: none
}
</style>