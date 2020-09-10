<template>

<div class="content" ref="aaaa">
  <ul class="wrapper">
    <li>wos1</li>
    <li>wos2</li>
    <li>wos3</li>
    <li>wos4</li>
    <li>wos5</li>
    <li>wos6</li>
    <li>wos7</li>
    <li>wos8</li>
    <li>wos9</li>
    <li>wos10</li>
    <li>wos11</li>
    <li>wos12</li>
    <li>wos13</li>
    <li>wos14</li>
    <li>wos15</li>
    <li>wos16</li>
    <li>wos17</li>
    <li>wos18</li>
    <li>wos19</li>
    <li>wos20</li>
    <li>wos21</li>
    <li>wos22</li>
    <li>wos23</li>
    <li>wos24</li>
    <li>wos25</li>
    <li>wos26</li>
    <li>wos27</li>
    <li>wos28</li>
    <li>wos29</li>
    <li>wos30</li>
    <li>wos31</li>
    <li>wos32</li>
    <li>wos33</li>
    <li>wos34</li>
    <li>wos35</li>
    <li>wos36</li>
    <li>wos37</li>
    <li>wos38</li>
    <li>wos39</li>
    <li>wos40</li>
    <li>wos41</li>
    <li>wos42</li>
    <li>wos43</li>
    <li>wos44</li>
    <li>wos45</li>
    <li>wos46</li>
    <li>wos47</li>
    <li>wos48</li>
    <li>wos49</li>
    <li>wos50</li>
    <li>wos51</li>
    <li>wos52</li>
    <li>wos53</li>
    <li>wos54</li>
    <li>wos55</li>
    <li>wos56</li>
    <li>wos57</li>
    <li>wos58</li>
    <li>wos59</li>
    <li>wos60</li>
    <li>wos61</li>
    <li>wos62</li>
    <li>wos63</li>
    <li>wos64</li>
    <li>wos65</li>
    <li>wos66</li>
    <li>wos67</li>
    <li>wos68</li>
    <li>wos69</li>
    <li>wos70</li>
    <li>wos71</li>
    <li>wos72</li>
    <li>wos73</li>
    <li>wos74</li>
    <li>wos75</li>
    <li>wos76</li>
    <li>wos77</li>
    <li>wos78</li>
    <li>wos79</li>
    <li>wos80</li>
  </ul>
</div>
</template>

<script>
  import BScroll from  'better-scroll'

    export default {
        name: "Category",
       data(){
          return{
            scroll:null
          }
       },
      mounted() {
          this.scroll=new BScroll(document.querySelector('.content'),{
             probeType:3,

             pullUpLoad:true,
             click:true,

          })
        this.scroll.on('scroll',(position) =>{
        })
        this.scroll.on('pullingUp',() =>{
          console.log('加载');
        })

      }
    }

</script>

<style scoped>
  .content{
    height: 200px;
    background-color: pink;
    /*overflow: auto;*/
    overflow: hidden;
  }
</style>
