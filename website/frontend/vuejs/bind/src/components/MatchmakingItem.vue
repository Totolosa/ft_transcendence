<template>
	<div class="stack center" id="page">
		<div v-if="isJoin" class="back left" @click="back()">
			<span class="material-symbols-outlined"> arrow_back_ios </span>
		</div>
		<div v-if="!isCreate && !isJoin" class="center column choice">
			<h1>Create or join</h1>
			<h2>Create or join a game</h2>
			<div class="center row">
				<button class="start" v-on:click="create()">create</button>
				<button class="start" v-on:click="join()">join</button>
			</div>
		</div>
		<div v-else-if="isJoin">
			<h1 v-if="!lobbys.length">No lobby</h1>
			<div v-for="lobby in lobbys" :key="lobby.lobby_name" class="center">
				<LobbyItem :lobby="lobby"></LobbyItem>
			</div>
		</div>
		<div class="center column stack" id="create" v-else-if="isCreate">
			<div id="game_pos">
				<GameItem :key="remount" />
			</div>
			<div v-if="!start && isOwner" id="settings">
				<h1>{{ nbrBall }}</h1>
				<h2 class="title">Balls</h2>
				<div class="center row">
					<button class="button" v-on:click="decrBall">LESS</button>
					<button class="button" v-on:click="incrBall">MORE</button>
				</div>
				<button class="start" v-on:click="launch">start</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted, provide, Ref, ref } from 'vue';
import GameItem from '@/components/GameItem.vue';
import { Socket } from 'socket.io-client';
import { VueCookies } from 'vue-cookies';
import { useToast } from 'vue-toastification';
import LobbyItem from './LobbyItem.vue';
const toast = useToast();

let define = inject('colors');
let start = ref(false);
provide('playing', start);
let socket: Socket = inject('socket')!;
let me: Ref<any> = inject('user')!;
const $cookies = inject<VueCookies>('$cookies');
let remount = ref(false);
let isOwner = ref(false);
provide('isOwner', isOwner);
let lobbys = ref([]);

let isCreate: Ref<boolean> = inject('isCreate')!;
let isJoin: Ref<boolean> = inject('isJoin')!;
let nbrBall = ref(1);

socket.on('lobbys', (data: any) => {
	lobbys.value = data;
});
socket.emit('lobbys');

function back() {
	isCreate.value = false;
	isJoin.value = false;
}
function create() {
	socket.emit('newLobby', { login: me?.value?.login, nbrBall: 1 });
	isCreate.value = true;
	isOwner.value = true;
}
function join() {
	isJoin.value = true;
	socket.emit('userUpdate', { login: me?.value?.login });
}
function update_game() {
	create();
	remount.value = !remount.value;
}
function launch() {
	start.value = !start.value;
	socket.emit('start', {
		lobby_name: me?.value?.lobby_name,
	});
}
function incrBall() {
	if (nbrBall.value + 1 <= 3) {
		nbrBall.value++;
		socket.emit('updateLobby', {
			lobby_name: me?.value?.lobby_name,
			nbrBall: nbrBall.value,
		});
		remount.value = !remount.value;
	} else {
		toast.warning('3 balls maximum');
	}
}
function decrBall() {
	if (nbrBall.value - 1 >= 1) {
		nbrBall.value--;
		socket.emit('updateLobby', {
			lobby_name: me?.value?.lobby_name,
			nbrBall: nbrBall.value,
		});
	} else {
		toast.warning('1 balls minimum');
	}
}
onMounted(() => {
	let game = document.getElementById('container');
	let settings = document.getElementById('settings');
	if (game && settings) settings.style.height = game.offsetHeight + 'px';
	socket.on('reload_game', () => {
		remount.value = !remount.value;
	});
	// window.addEventListener("resize", () => {
	// 	reload++;
	// })
});
onUnmounted(() => {
	socket.off('reload_game');
	socket.off('lobbys');
});
</script>

<style scoped>
#page {
	height: 100%;
	max-width: calc(100vh - 65px);
	padding: 5px 5px 0 5px;
	min-height: 300px;
	/* padding: 0 calc(); */
}
#settings {
	position: absolute;
	top: 0;
	top: 26%;
	z-index: 10;
}
.choice {
	margin: 150px 0;
}
#game_pos {
	position: relative;
	top: 0;
	left: 0;
}
.button {
	margin: 20px 10px;
	font-size: 1rem;
}
.title {
	margin-bottom: -18px;
	font-size: 1.25rem;
}
.start {
	/* margin-top: 10px; */
	/* margin-bottom: 95px; */
	background-color: v-bind('define.color2');
	border-radius: 10px;
	color: v-bind('define.color0');
	font-size: 18px;
	width: 7rem;
	height: 1.8rem;
	margin: 1rem 0.5rem;
}
.back {
	position: absolute;
	filter: invert(25%) sepia(82%) saturate(867%) hue-rotate(168deg)
	brightness(100%) contrast(87%);
	top: 0;
	cursor: pointer;
}
</style>
