const pipe = (fn, ...fns) => x => fns.reduce((acc, fnNext) => fnNext(acc), fn(x));
// const compose = (...fns) => pipe(fns.reverse());
const $f = (method) => (...args) => ([el]) => [$(el)[method](...args)];
// const fmap = (method, ...args) => (array) => array[method](...args);
const S = f => g => x => f(x)(g(x));

// 1st step
Array.from($(".shop"))
  .map(el => {
    const price = $(el).find("> .header > .sub_info > .price").text().replace(",", "");
    const [, min, yen] = /(\d+)分\/(\d+)円/.exec(price) || [, 1, 9999];
    return [el, yen / min];
  })
  .sort(([, a], [, b]) => Math.sign(b - a))
  .reduce((parent, [el]) => parent.prepend(el), $(".shop_list_area"));

// Next step
const getCp = pipe(
  $f("find")("> .header > .sub_info > .price"),
  $f("text")(),
  price => price.replace(",", ""),
  RegExp.prototype.exec.bind(/(\d+)分\/(\d+)円/),
  ([, min, yen]) => yen / min
);

pipe(
  $,
  Array.from,
  fmap("map", S(el => cp => [el, cp])(getCp)),
  fmap("sort", ([, a], [, b]) => Math.sign(b - a)),
  fmap("reduce", (parent, [el]) => parent.prepend(el), $(".shop_list_area"))
)(".shop");

// 
function getCp(parentSelector) {
  [parentSelector]
    .map($f("find")("> .header > .sub_info > .price"))
    .map($f("text")())
    .map(([price]) => [price.replace(",", "")])
    .map(RegExp.prototype.exec.bind(/(\d+)分\/(\d+)円/))
}

[".shop"]
  .flatMap($f("toArray")())
  .map(S(el => cp => [el, cp])(getCp))
  .sort(([, a], [, b]) => Math.sign(b - a))
  .reduce((parent, [el]) => parent.prepend(el), $(".shop_list_area"));

// 1st step
$("#jyosei").contents().find(".ladyList:has(.listTime:contains('二軍調整'))").remove().end()
  .find(".cover > .ladyPop")
  .toArray()
  .reduce((promise, a) => {
    return promise.then(_ => {
      return new Promise(resolve => {
        fetch(a.href)
          .then(resp => resp.blob())
          .then(blob => {
            const reader = new FileReader();
            return new Promise(resolve2 => {
              reader.onload = () => { resolve2(reader.result) };
              reader.readAsText(blob, 'shift-jis');
            });
          })
          .then(text => new DOMParser().parseFromString(text, 'text/html'))
          .then(dom => {
            const div = document.createElement('div');
            document.body.append(div);
            div.append(dom.querySelector('#prof'), dom.querySelector('#comment'));
            div.style.cssText = 'display:grid; grid-template-columns:min-content min-content; width:min-content; background:#eff0f1';
            div.querySelector('#shopComment').style.cssText = 'height:300px';
            const name = div.querySelector('#name');
            name.innerHTML = `<a href="${a.href}" target="_blank">${name.textContent}</a>`;
          })
          .then(resolve);
      });
    });
  }, Promise.resolve())
  .then(_ => alert('done'))

// Next step
const F = f => g => x => y => f(g(y)(x));
const pipeP = (fn, ...fns) => x => fns.reduce((promise, fnNext) => promise.then(acc => fnNext(acc)), fn(x));

pipe(
  $f("contents")(),
  $f("find")(".ladyList:not(:has(.listTime:contains('二軍調整'))) > .listPhoto > .cover > .ladyPop"),
  $f("toArray")(),
  fmap("map", a => `<iframe src="${a.href}" class="omg">`),
  fmap("map", F($f("appendTo")(document.body))($f("load"))),
  fmap("map", f => _ => new Promise(f)),
  fns => [...fns, _ => $(".omg").width(700).height(500)],
  fns => pipeP(...fns)(Promise.resolve())
)("#jyosei");

["#jyosei"]
  .map($f("contents")())
  .map($f("find")(".ladyList:not(:has(.listTime:contains('二軍調整'))) > .listPhoto > .cover > .ladyPop"))
  .flatMap($f("toArray")())
  .map(a => `<iframe src="${a.href}" class="omg">`)
  .map()
