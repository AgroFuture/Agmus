
<script>
export default {
  name: 'AppFooterComponent',
};
</script>

<style lang="scss" scoped>
#footer {
  background-color: transparent;
  position: absolute;
  bottom: 0;
  width: 100%;

  .wrapper {
    height: 60px;
    padding: 10px 20px;
  }

  span {
    font-size: 0.9em;
  }
}

@media (min-width: 768px) {
  #footer {
    .wrapper {
      height: 50px;
    }
  }
}
</style>
