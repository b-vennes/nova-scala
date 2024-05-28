(
	(object_definition
		name: (identifier) @name
	) @subtree
	(#set! role type)
  (#set! scope.byLine)
)

(
	(val_definition
		pattern: (identifier) @name
	) @subtree
	(#set! role block)
  (#set! scope.byLine)
)

(
	(var_definition
		pattern: (identifier)	@name
	) @subtree
	(#set! role block)
  (#set! scope.byLine)
)

(
	(class_definition
		name: (identifier) @name
	) @subtree
	(#set! role type)
  (#set! scope.byLine)
)

(
	(enum_definition
		name: (identifier) @name
	) @subtree
	(#set! role type)
  (#set! scope.byLine)
)

(
	(full_enum_case
		name: (identifier) @name
	) @subtree
	(#set! role type)
  (#set! scope.byLine)
)

(
	(simple_enum_case
		name: (identifier) @name
	) @subtree
	(#set! role type)
  (#set! scope.byLine)
)

(
	(trait_definition
		name: (identifier) @name
	) @subtree
	(#set! role type)
  (#set! scope.byLine)
)

(
	(trait_definition
		body: (template_body
			(function_declaration
				name: (identifier) @name
			) @subtree
		)
	)
	(#set! role function)
  (#set! scope.byLine)
)

(
	(class_definition
		body: (template_body
			(function_definition
				name: (identifier) @name
			) @subtree
		)
	)
	(#set! role function)
  (#set! scope.byLine)
)

(
	(object_definition
		body: (template_body
			(function_definition
				name: (identifier) @name
			) @subtree
		)
	)
	(#set! role function)
  (#set! scope.byLine)
)

(
	(function_definition
		body: (block
			(function_definition
				name: (identifier) @name
			) @subtree
		)
	)
	(#set! role function)
  (#set! scope.byLine)
)
