Это наш файл для общения

Е (9(?) или 10(?).04): Запрос на создание клиента крашит сервер, если пароль только из цифр состоит. Какго рожна?
Сам хочу знать. В дальнейшем не забыть закастить пароль перед передачей в конструктор в стринг.

М (11.04): Окей, приняла. Можно превратить это в фичу в виде обязательства ввести пароль из цифр+букв. А в начале сделать проверку
for (i=0, i<длина строки, ++i){
    if (a[i] = буква) x++
    if (a[i] = цифра) y++
    if (x>0 и y>0) break
}
Проверка гарантирует, что в пароле есть и буква и цифра, значит у нас не крашнется, значит пользователь может спокойно логиниться

Е (04.05) Создание новой ветки под фронтенд + проверка слияния

Ссылка на писку:
https://pixso.net/app/editor/CgIXDr6LWgvnUzHroFk-xQ?file_type=10&icon_type=1&page-id=0%3A1




Как запустить реакт у себя?
1) из папки client вводишь команду "npm install -g npm"
2) из той же пустой папки client вызываешь команду "npx create-react-app ."   да, точку тоже ставишь это вроде для названия

12.05 ГОТОВЫЙ ФРОНТ!