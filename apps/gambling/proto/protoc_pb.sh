#brew install protobuf@3
#brew link --overwrite protobuf@3
#pnpm add -global protoc-gen-ts

mkdir ./pub
#mkdir ./pub/js
#rm ./pub/js/**.js
rm ./pub/**.ts

#protoc ./message_type.proto --ts_out=./pub
#protoc ./error_code.proto --ts_out=./pub
#protoc ./msg_base.proto --ts_out=./pub
#protoc ./msg_tp.proto --ts_out=./pub
#protoc ./msg_rummy.proto --ts_out=./pub
#protoc ./msg_texas.proto --ts_out=./pub
#protoc ./msg_ab.proto --ts_out=./pub
#protoc ./msg_ab2.proto --ts_out=./pub
#protoc ./msg_carrom.proto --ts_out=./pub
#protoc ./msg_pool.proto --ts_out=./pub
#protoc ./msg_question.proto --ts_out=./pub
#protoc ./msg_mini.proto --ts_out=./pub
#protoc ./msg_truco.proto --ts_out=./pub
#protoc ./msg_crash.proto --ts_out=./pub
#protoc ./msg_slots.proto --ts_out=./pub

#protoc ./message_type.proto --js_out=./pub
#protoc ./error_code.proto --js_out=./pub
#protoc ./msg_base.proto --js_out=./pub
#protoc ./msg_tp.proto --js_out=./pub
#protoc ./msg_rummy.proto --js_out=./pub
#protoc ./msg_texas.proto --js_out=./pub
#protoc ./msg_ab.proto --js_out=./pub
#protoc ./msg_ab2.proto --js_out=./pub
#protoc ./msg_carrom.proto --js_out=./pub
#protoc ./msg_pool.proto --js_out=./pub
#protoc ./msg_question.proto --js_out=./pub
#protoc ./msg_mini.proto --js_out=./pub
#protoc ./msg_truco.proto --js_out=./pub
#protoc ./msg_crash.proto --js_out=./pub
#protoc ./msg_slots.proto --js_out=./pub


#NOTE: https://protobufjs.github.io/protobuf.js/
#pbjs -t static-module -w es6 -o ./apps/gambling-dashboard/proto/pub/msg_base.js ./apps/gambling-dashboard/proto/msg_base.proto

pbjs -t static-module -w es6 -o ./pub/js/message_type.js ./message_type.proto
pbjs -t static-module -w es6 -o ./pub/js/error_code.js ./error_code.proto
pbjs -t static-module -w es6 -o ./pub/js/msg_base.js ./msg_base.proto
pbjs -t static-module -w es6 -o ./pub/js/msg_tp.js ./msg_tp.proto
pbjs -t static-module -w es6 -o ./pub/js/msg_rummy.js ./msg_rummy.proto
pbjs -t static-module -w es6 -o ./pub/js/msg_texas.js ./msg_texas.proto
pbjs -t static-module -w es6 -o ./pub/js/msg_ab.js ./msg_ab.proto
pbjs -t static-module -w es6 -o ./pub/js/msg_ab2.js ./msg_ab2.proto
pbjs -t static-module -w es6 -o ./pub/js/msg_carrom.js ./msg_carrom.proto
pbjs -t static-module -w es6 -o ./pub/js/msg_pool.js ./msg_pool.proto
pbjs -t static-module -w es6 -o ./pub/js/msg_question.js ./msg_question.proto
pbjs -t static-module -w es6 -o ./pub/js/msg_mini.js ./msg_mini.proto
pbjs -t static-module -w es6 -o ./pub/js/msg_truco.js ./msg_truco.proto
pbjs -t static-module -w es6 -o ./pub/js/msg_crash.js ./msg_crash.proto
pbjs -t static-module -w es6 -o ./pub/js/msg_slots.js ./msg_slots.proto

#pbts -t static-module -w es6 -o ./pub/message_type.ts ./pub/js/message_type.js
#pbts -t static-module -w es6 -o ./pub/error_code.ts ./pub/js/error_code.js
#pbts -t static-module -w es6 -o ./pub/msg_base.ts ./pub/js/msg_base.js
#pbts -t static-module -w es6 -o ./pub/msg_tp.ts ./pub/js/msg_tp.js
#pbts -t static-module -w es6 -o ./pub/msg_rummy.ts ./pub/js/msg_rummy.js
#pbts -t static-module -w es6 -o ./pub/msg_texas.ts ./pub/js/msg_texas.js
#pbts -t static-module -w es6 -o ./pub/msg_ab.ts ./pub/js/msg_ab.js
#pbts -t static-module -w es6 -o ./pub/msg_ab2.ts ./pub/js/msg_ab2.js
#pbts -t static-module -w es6 -o ./pub/msg_carrom.ts ./pub/js/msg_carrom.js
#pbts -t static-module -w es6 -o ./pub/msg_pool.ts ./pub/js/msg_pool.js
#pbts -t static-module -w es6 -o ./pub/msg_question.ts ./pub/js/msg_question.js
#pbts -t static-module -w es6 -o ./pub/msg_mini.ts ./pub/js/msg_mini.js
#pbts -t static-module -w es6 -o ./pub/msg_truco.ts ./pub/js/msg_truco.js
#pbts -t static-module -w es6 -o ./pub/msg_crash.ts ./pub/js/msg_crash.js
#pbts -t static-module -w es6 -o ./pub/msg_slots.ts ./pub/js/msg_slots.js
