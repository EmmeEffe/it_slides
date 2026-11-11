/**
 * @file frazioni.cpp
 * @author Prof. Martino Falorni
 * 
 * ToDo List:
 * - Scrivere nel main la parte di codice per inserire i dati per la frazione
 * - Scrivere i getter delle variabili private
 * 
 * - Scrivere nella classe i seguenti metodi:
 *   - getFloatVal() che ritorna il valore in decimale della frazione. Ad esempio se la frazione vale 3/2 deve ritornare 1.5
 *   - isPropria() che ritorna vero se la frazione è propria
 *   - isImpropria() che ritorna vero se la frazione è impropria
 *   - EXTRA: isApparente() che ritorna vero se la frazione è apparente, questo è un po' più complesso
 *   - EXTRA: Scrivi un metodo che la riduce ai minimi termini
 * 
 */

#include <iostream>
using namespace std;

class Frazione{
private:
  int num, den;
public:
  void setNum(int val_num){
    num = val_num;
  }
  void setDen(int val_den){
    if(val_den != 0){
      den = val_den;
    }else{
    cout << "Il denominatore non può essere zero" << endl;
    }
  }
}

int main(){

  return 0;
}
