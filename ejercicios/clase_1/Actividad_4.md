Actividad 4 — Mapeando el árbol DNS 



Dado este conjunto de URLs reales, identificá los componentes del árbol DNS y respondé las preguntas.



https://app.maravilla.co.cr

https://api.github.io

https://campus.utn.ac.cr

https://www.netflix.com



1. Para cada URL: identifica el TLD, el SLD y el subdominio (si lo hay). ¿Cuáles son ccTLDs y cuáles gTLDs?



|URL|TLD|Tipo|SLD|Subdominio|
|-|-|-|-|-|
|campus.utn.ac.cr|.cr|ccTLD|utn.ac|campus|
|www.netflix.com|.com|gTLD|netflix|www|
|api.github.io|.io|ccTLD |github|api|
|app.maravilla.co.cr|.cr|ccTLD|maravilla.co|app|



¿Cuáles son ccTLD y cuáles gTLD?

* ccTLD: .cr, .io
* gTLD: .com



2\. ¿Quién administra el TLD .cr? ¿Y el .com? ¿Necesitás ICANN para registrar un subdominio?



* El dominio .cr es administrado por NIC Costa Rica (UCR).
* El dominio .com es administrado por Versign, bajo supervisión de ICANN 



* No se necesita ICANN para crear un subdominio porque estos se configuran directamente desde el panel DNS del dominio principal. Solo el dominio principal (SLD/TLD) requiere registro y pago. 





3\. Si la UTN quisiera crear un portal de egresados en egresados.utn.ac.cr, ¿necesita pagar a un registrar? ¿Por qué?



\-No, porque la UTN ya posee el dominio utn.ac.cr, por lo tanto puede crear el subodminio egresados.utn.ac.cr desde la configuración interna DNS. 



4\. ¿Qué diferencia hay entre un registro A y un registro CNAME en DNS? (Investigación rápida si no lo sabés)



* Un registro A relaciona un nombre de dominio con una dirección IPV4. Ej: utn.ac.cr ---> 192.168.1.1



* Un registro CNAME crea un alias que apunta a otro nombre de dominio. Ej: www.utn.ac.cr ---> utn.ac.cr



CNAME evita duplicar configuraciones IP y permite que ambos nombres resuelvan al mismo destino. 

