import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesServices } from '../../services/paises.service';
import { PaisCorto } from '../../interfaces/paises.interface';
import { switchMap, tap } from 'rxjs/operators';
import { Frontera } from '../../interfaces/frontera.interface';
@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  constructor( private fb: FormBuilder,
               public paisesService: PaisesServices ) { }
  
  regiones  : string   [] = [];
  paises    : PaisCorto[] = [];
  fronteras:string [] = [];
  cargando = false;

  miFormulario:FormGroup = this.fb.group({
    region  : ['', Validators.required],
    pais    : ['', Validators.required],
    frontera: ['', Validators.required]
  });


  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;

    // Cuando cambie la selección
    // this.miFormulario.get('region')?.valueChanges
    //     .subscribe( region => {
    //       if(region===''){
    //         this.paises = [];
    //         return;
    //       }
    //       this.paisesService.getPaisesPorRegion(region)
    //            .subscribe( (paises: PaisCorto[]) =>{
    //              this.paises = paises;
    //            })
    //     })
       // Buscar Paises
      this.miFormulario.get('region')?.valueChanges
            .pipe (
              tap (( _ )  => {
                this.paises = [];
                this.miFormulario.get('pais')?.reset('');
                this.cargando = true;
                
              }),
              switchMap(region => this.paisesService.getPaisesPorRegion(region))
              )
              .subscribe( (paises: PaisCorto[]) =>{
                this.paises = paises;
                this.cargando = false;
              });
              
              this.miFormulario.get('pais')?.valueChanges
              .pipe(
                tap( ( _ ) =>{
                  this.fronteras = [];
                  this.miFormulario.get('frontera')?.reset('');
                  this.cargando = true;
                  // this.miFormulario.get('frontera')?.disable();
              }),
              switchMap( pais => this.paisesService.getPaisPorCodigo(pais) )
            )
          .subscribe( fronteras =>{
            if (fronteras){
              for (const frontera in fronteras.borders) {
                  this.paisesService.getPaisPorCodigo(fronteras.borders[frontera])
                      .subscribe(pais =>{
                        if(pais)
                        {this.fronteras.push(pais?.name.common);}
                      })
              }
            }else{
              this.fronteras=[];
            }
            this.cargando = false;
            // if (codigo){
            //   this.miFormulario.get('frontera')?.reset('');
            //   this.paisesService.getPaisPorCodigo(codigo)
            //       .subscribe(fronteras =>{
            //         this.fronteras= fronteras.borders;
            //       })
            // }
          })
        
  }

 
guardar(){

}

}
