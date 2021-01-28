(module
 (type $i32_=>_i32 (func (param i32) (result i32)))
 (import "env" "memory" (memory $0 0))
 (export "memory" (memory $0))
 (export "fib" (func $assembly/index/fib))
 (func $assembly/index/fib (param $0 i32) (result i32)
  local.get $0
  i32.const 1
  i32.le_s
  if
   i32.const 1
   return
  end
  local.get $0
  i32.const 1
  i32.sub
  call $assembly/index/fib
  local.get $0
  i32.const 2
  i32.sub
  call $assembly/index/fib
  i32.add
 )
)
