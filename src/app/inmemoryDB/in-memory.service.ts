import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';


@Injectable({
  providedIn: 'root'
})
export class InMemoryService implements InMemoryDbService {

  constructor() { }

   createDb() {

    let products = [
     { id: 1, name: 'Shock', price: 10, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdEGIi8stY8h-_KnpLnIpL71gdzyQ2_GTXaw&usqp=CAU', quantity: 15, altImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXwck4mtr1y1MulgaJWP79_3t4yO57dS0dGw&usqp=CAU'},
     { id: 1, name: 'Chlorine Tablets', price: 20, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfe0fLvtxCMUa81GiCKlw1g7FmXCIeEz1h8Q&usqp=CAU', quantity: 5, altImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO94Y60VAuw9oCrqpeg_udrW-6W_Vk1Q_47Q&usqp=CAU'},
     { id: 1, name: 'Pool Pole', price: 10, image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBhQIBxMWFhUWGR8bGRgYGCIYGRsWHBgdICAfHx0YHSggJCYxJx8fITMhJSoyLi4uGiA1ODMtNyg4OisBCgoKDg0OGxAQGy8fICYvLTIvLzEtKzIrMjUtLS0wMC4tMjAtLTQyLTctLS0uLysvMC0rNy8rMC0tLSsuLy83Lf/AABEIAQgAvwMBIgACEQEDEQH/xAAcAAEAAwEBAQEBAAAAAAAAAAAABQYHBAMCAQj/xAA2EAACAQIDBgMGBQQDAAAAAAAAAQIDEQQFIQYSMUFRgQciYRMUMnGRwSNCUrHwFaHR4TNicv/EABoBAQADAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAoEQEAAgIBAwIFBQAAAAAAAAAAAQIDERITITEE8EFRYXHhBSKRscH/2gAMAwEAAhEDEQA/ANxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAByZtmFDKsunjsV8MFf1b5JerencyXD7c56sweIVRNSl/xyScEm+C0uvmnckPFHPPfMwWU4d+Sk7z9ajXDsn9ZPoU7CUpzqJU1eTajGPNybsrHLlyTvUPb9D6SvT5ZI3v5t2yTNaWbYV1qas4ycJLpJJPR90SBG7OZWsnyengrptK8n1k3dskjprvXd4+Tjynj4AASoAAAAAAAAAAAAAAAAAAAAABDbW51HIckni9N/4YLrN8PpxfyJkxXxCz55znrpUX+FRvGPRz/NL66L0jfmUyX4w6/R+n62TXwjyru9KrV3ptuUndvm23qX/wAM8kWJxjzSuvJS0p9HUfF9l/droUnKMDWzHHQwmGXnqPdXoub9Uld9mbzleAo5Zl8MFhvhgrfPq+717nLhrytyl6v6ln6ePp18z/Xvs6gAdr58AAAAAAAAAAAAAAAAAAAAAAABx5rjFgsE6vFvSK6yfBff5JmZ5lsXQnhfaYB7soK7Tflb9OjLjmeK98x146xp+WPrPm/t2fU6Muw3t8Qqb+GHml6y5L79l1F6RNdS0xZ74rbpOkN4c7OVcuhPMcwg41JeWMZKzjBPVtdW19F6l4AK0rFY1Cc2a2W83sAAsyAAAAAAAAAAAAAAAAAAAAAAjs7xksNhvZ0fjnpH0XN9v3aJCTUY70tEioY/GSxWIeIX5vLTXSC5/f6ItWNyPylaC/DV7eWK6y4f6LRl+FWEwqpvV8ZPrJ8f8fJIh8gwiq1veH8MNI+sub7fu30LCRM7nYAAgAAAAAAAAAAAAAAAAAAAAAAApfi5mePy7YuqsrT36nkbXxRpNPfkkteGl+W9fkBnW2PirmFTaadHKZJ4Sm9zdsrVrPzScrXSb0Vna2utyxbObU5ftLVisJJQqyahGnN2lH7Prp0MI0aSiXPwn2altHtbB1F+Dh2qtR+qfkj3kvpGRafGkP6WwuHhhcPGhS4RVv8Af3PUAqkAAAAAAAAAAAAAAAAAAAAAAAAM02k26yfDbZTy/FtqNGCi6vGCqt3cXppxit7hfR2sWrbraWlsvs/PHSfnl5KS43qS4aXV0tZNdIswLIqPsMDWz3MKvlipKS0k6s5WvvX43d9Lptr61tlrijlb7fya2umf7B5TndH3/AP2VWo7p00pU5uXC8Vpd9Ytcdbmh+HuyNLY7IfclJTqTk51ZpW3pPRJJt6JJJd3zIXwg2blluz6zHHQ3ald+0VO1o04203Yv4W+L+fLgaCW3tMxoAAQAAAAAAAAAAAAAAAAAAAAAABTfFPPq+TbNTpZff2tVOKa4whwlP52dl6u/IJiJntDM9vs2q7a7ZRwGDf4NFuMJLVWdt+o7O3ovkuFz8yvIcJtNtvRybBwSo4Xz15JJqVnHySaST+GML2u9f0sj8Jhq2zuRSzDBxhVlNQUJxacVvabq1Tum+KunazS4mv+F2zE9mtml73f29Z+0q73FSkvh48ufVtnNNL3z8p7Vr4+sz5n/E+IXBJJWQAOlUAAAAAAAAAAAAAAAAAAAAAAAB8znGnBznolq/kZhtpQxOLxDzWi2/y7trpQ1tw+bv8AMs+2Gb1IVFlmXuPtLb8k+ceUfS9m78rK6aZUcvzHEYevTw7hiaTnK0abgqsXa7tGcZON7Rktd3RJ20106PKk7jbXBl6d+UTqfr4lH7C7J4bNtoY4yVNwp0JKrJJtQnV13PL8LfGTfRJfmNoObL8N7phFTfHjJ2SvLsdJhSnCNGfL1bzbWvsAAuyAAAAAAAAAAAAAAAAAAAAAA8MdiY4PCSxE03upuy4v0Xq+B7mY+JG01WnmtPA4aahSpyftKjdl7bduo6XeifRpuduRelJvOoTGt93BioYnH1auIowWLjUm6jUaip1qc7WirSlG1rKKcZJ2XB87L4f5RiPdqeKzaFT2lKKV6k95uo4JTaSnJW5K9uJVssxGIznFwo4nB051JuyqXUdP1N05tSVlfR8ORrWCwtHBYWOHw6SjFaJKy/nM0vlvrjMaXyY8de9Z37+f4h7gAwZgAAAAAAAAAAAAAAAAAAAAAAAOLN8b7hg3Uj8T0iv+z/l+xguYqtkuc1vfHVnCd3v07SvKUrvfjLRu11rpqzTtp83jKrKun5YXjD1fN/b5L1KhkOXVc/zyNB3tfem+kV/LfNnViv0o3MeVJja2eFuUUoYB51KG66t9xOlCm1Hm7QXO3N8FyuXw+aVOFKmqdNWSVklySPo572m1trRGgAFUgAAAAAAAAAAAAAAAAAAAAARO0WO91wnsabtOei9I839vmyUnKMIOc3ZLVv0M32mzd1ZyxH6tIrpBcPrx7l8ddyiZV/P8aqtX2VP4Y6I0PYLJP6VlCr1l+JVtKXVR/Kvv39Cj7FZO87zvfrK9Ol5p9G+Ue/7Jmvi9tyRGgAFEgAAAAAAAAAAAAAAAAAAAAAAeOLxNPCYaWIrcIq/+vsBB7W5iqVH3OL4q8/8AzyXd/wBk+pl+a4qeLxO7Tu23aKXUmdocyqVZynUfmk7v06LstOx0eG2Te/5i82xC8lJ2hfnU69uPzaNp/ZXSvleNk8mjkeTRwz+N+ab6zf8Ajh2JkAxWAAAAAAAAAAAAAAAAAAAAAAAACnbZ5qt/3SD0hrL1nyXbj3XQsmcY+OW4CWIfHhFdZPh/n5JmR51jZTk9531bb6t8WaY4+MolxThXzTMY4TDazqSsu/P+dDacny6jlOWwwOH4QVr9Xzfd6lL8L8kahLO8UtZXjTv+nnL7dn1NBK2tuUgAKgAAAAAAAAAAAAAAAAAAAAAAENtTmqyzLmoO056R9Osu37tExGxVNtc5WIxbp0n5ad4r1l+Z/bt6lQyrL62f51DAUuDd5PpBcX/ObR5Zni78DSfDfIv6ZlPv2JX4tbX1UPyrvx7roaXnUcYRC14ahSwuHjh6CtGKSS6JI9ADJIAAAAAAAAAAAAAAAAAAAAAAAAUTbvK82rV3jKMfaQSslDWUVz8vF6819i9gms6nYxbY3JntBn6jVV6VLzVOj10j3f8AZM2nhwPOnRpU5ynTik5ayaVm369T0EzsAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//Z', quantity: 25, altImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUqER7pF05N0BtjleLzMy5AfgG7TPGQ_GiRQ&usqp=CAU'},
     { id: 1, name: 'Skimmer Net', price: 25, image: 'data:image/jpeg;base64,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', quantity: 4, altImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkcgMYe_mj27VnrynT6CmX1uB1mxRDUCdAzA&usqp=CAU'},
     { id: 1, name: 'Chemical Test Strips', price: 40, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOhBKb2MUABKO0TN1p8ID0VhT4rrMEEUtSbOuikp4uiaK3jmzrkT9MhW9WtK6uOoo7sQI&usqp=CAU', quantity: 30, altImage:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdcyCjse2GJiDOHTT-vpNmWJqj6ukP1uvHHw&usqp=CAU'},
    ];

    let service = [
      {id: 1, name: 'Pool Opening', price: 275},
      {id: 2, name: 'Pool Closing', price: 275},
      {id: 3, name: 'Power Vacuum', price: 95},
      {id: 4, name: 'Service Call', price: 250},
    ]

    return {products, service};
  }
}
