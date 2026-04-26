<template>
    <div>
        <h1 :style = "{color: 'white'}">Welcome to Wordle-Clone!</h1>
        <button @click="$router.push('/game')">Play Game</button>
    </div>
</template>
