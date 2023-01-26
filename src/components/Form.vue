<template>
  <div id="modal" v-if="modalIsActive">
    <div class="inner">
      <div class="close" @click="closeModal">
        <img src="/src/assets/images/form/close.svg" />
      </div>

      <!-- edit/create item -->
      <div class="box" v-if="props.action !== 'confirmDelete'">
        <h2 class="title">{{ props.title }}</h2>
        <form @submit.prevent="handleAction">
          <div class="inputs-wrap">
            <div class="input-wrap" v-for="(value, name) in modalData" :key="name">
              <label :for="name">{{ name.replaceAll("_", " ") }}</label>
              <input type="text" :name="name" v-model="modalData[name]" required />
            </div>
          </div>

          <button type="submit">
            {{ props.btnText }}
            <img src="/src/assets/images/form/submit.svg" />
          </button>
        </form>
      </div>

      <!-- confirm delete item -->
      <div class="box delete" v-else>
        <h2 class="title">{{ props.title }}</h2>
        <p class="deleteText">Are you sure you want to delete item?</p>
        <div class="deleteButtons flex">
          <button @click="closeModal" class="btn cancel">Cancel</button>
          <button @click="handleAction" class="btn delete">Delete</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const props = defineProps({
  title: String,
  btnText: String,
  action: String,
});

const modalData = computed(() => store.getters.modal.item.data);
const modalIsActive = computed(() => store.getters.modal.isActive);

function closeModal() {
  store.dispatch("showModal", false);
}

function handleAction(e) {
  e.preventDefault();
  const modalData = store.getters.modal.item.data;
  const exp = props.action;
  switch (exp) {
    case "edit":
        const data = {
            index: store.getters.modal.item.index, 
            data: modalData
        };
        store.dispatch("updateTableItem", data);
        break;
    case "create":
        const allFieldsAreEmpty = Object.values(store.getters.modal.item.data).includes("");
        if (allFieldsAreEmpty) return;
        store.dispatch("createTableItem", modalData);
        break;
    case "confirmDelete":
      store.dispatch('deleteTableItem', store.getters.modal.item.index);
        break;        
        default:
  }
  closeModal();
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/global.scss";
@import "../assets/scss/variables.scss";

#modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  .inner {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: fit-content;
    /* height: 500px; */
    background: #fff;
    color: $secondary-color;
    padding: 20px 50px;
    border-radius: 5px;
    .close {
      position: absolute;
      width: 20px;
      height: 20px;
      cursor: pointer;
      right: 20px;
      top: 20px;
    }
    .title {
      font-size: 20px;
      font-weight: 600;
    }
    form {
      padding: 20px 0;

      .inputs-wrap {
        display: flex;
        flex-direction: column;
        gap: 10px;
        .input-wrap {
          display: flex;
          gap: 20px;
          align-items: center;
          label {
            text-transform: capitalize;
            min-width: 80px;
            flex: 1;
          }
          input {
            width: 300px;
            border-bottom: 1px solid $secondary-color;
            padding: 5px 0;
            text-overflow: ellipsis;
          }
        }
      }

      button {
        display: flex;
        align-items: center;
        font-weight: 600;
        gap: 10px;
        margin: 30px 0 0 auto;
      }
    }

    .box.delete{
      text-align: center;

      .deleteText{
        margin: 10px 0;
      }
      .deleteButtons{
        gap: 10px;
        justify-content: center;
        margin-top: 20px;      
        .btn{
          &.cancel{}
          &.delete{
            background: $err-color;
            &:hover{
              background: #a31a3d;
            }
          }
        }
      }      
    }

  }
}

@media (max-width: 768px) {
}

@media (max-width: 640px) {
}
</style>
